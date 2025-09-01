import tkinter as tk
from tkinter import ttk, filedialog, messagebox, scrolledtext
import win32com.client
import pythoncom
import time
import threading
import csv
from datetime import datetime
import os

class SAPBulkProcessor:
    def __init__(self, root):
        self.root = root
        self.root.title("SAP Bulk Part Processor")
        self.root.geometry("800x700")
        
        # SAP connection variables
        self.sap_gui_auto = None
        self.application = None
        self.connection = None
        self.session = None
        
        # Processing variables
        self.is_processing = False
        self.current_part_index = 0
        self.total_parts = 0
        self.part_numbers = []
        self.processed_parts = []
        self.failed_parts = []
        
        self.setup_gui()
        
    def setup_gui(self):
        # Main frame
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # SAP Connection Section
        connection_frame = ttk.LabelFrame(main_frame, text="SAP Connection", padding="10")
        connection_frame.grid(row=0, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=5)
        
        ttk.Button(connection_frame, text="Connect to SAP", 
                  command=self.connect_to_sap).grid(row=0, column=0, padx=5)
        
        self.connection_status = ttk.Label(connection_frame, text="Not Connected", 
                                         foreground="red")
        self.connection_status.grid(row=0, column=1, padx=10)
        
        # Part Numbers Input Section
        input_frame = ttk.LabelFrame(main_frame, text="Part Numbers Input", padding="10")
        input_frame.grid(row=1, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=5)
        
        # Manual input
        ttk.Label(input_frame, text="Enter part numbers (one per line):").grid(row=0, column=0, sticky=tk.W)
        
        self.part_text = scrolledtext.ScrolledText(input_frame, width=50, height=8)
        self.part_text.grid(row=1, column=0, columnspan=3, pady=5, sticky=(tk.W, tk.E))
        
        # File input
        ttk.Button(input_frame, text="Load from CSV File", 
                  command=self.load_from_csv).grid(row=2, column=0, pady=5, sticky=tk.W)
        
        ttk.Button(input_frame, text="Load Sample Data", 
                  command=self.load_sample_data).grid(row=2, column=1, pady=5)
        
        ttk.Button(input_frame, text="Clear All", 
                  command=self.clear_parts).grid(row=2, column=2, pady=5)
        
        # Processing Settings
        settings_frame = ttk.LabelFrame(main_frame, text="Processing Settings", padding="10")
        settings_frame.grid(row=2, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=5)
        
        ttk.Label(settings_frame, text="Delay between parts (seconds):").grid(row=0, column=0, sticky=tk.W)
        self.delay_var = tk.StringVar(value="2")
        delay_entry = ttk.Entry(settings_frame, textvariable=self.delay_var, width=10)
        delay_entry.grid(row=0, column=1, padx=5)
        
        ttk.Label(settings_frame, text="Max retries per part:").grid(row=0, column=2, sticky=tk.W, padx=(20,0))
        self.retry_var = tk.StringVar(value="3")
        retry_entry = ttk.Entry(settings_frame, textvariable=self.retry_var, width=10)
        retry_entry.grid(row=0, column=3, padx=5)
        
        # Control Buttons
        control_frame = ttk.Frame(main_frame)
        control_frame.grid(row=3, column=0, columnspan=2, pady=10)
        
        self.start_button = ttk.Button(control_frame, text="Start Processing", 
                                     command=self.start_processing, style="Accent.TButton")
        self.start_button.grid(row=0, column=0, padx=5)
        
        self.stop_button = ttk.Button(control_frame, text="Stop Processing", 
                                    command=self.stop_processing, state="disabled")
        self.stop_button.grid(row=0, column=1, padx=5)
        
        self.pause_button = ttk.Button(control_frame, text="Pause", 
                                     command=self.pause_processing, state="disabled")
        self.pause_button.grid(row=0, column=2, padx=5)
        
        # Progress Section
        progress_frame = ttk.LabelFrame(main_frame, text="Progress", padding="10")
        progress_frame.grid(row=4, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=5)
        
        self.progress = ttk.Progressbar(progress_frame, mode='determinate')
        self.progress.grid(row=0, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=5)
        
        self.progress_label = ttk.Label(progress_frame, text="Ready")
        self.progress_label.grid(row=1, column=0, sticky=tk.W)
        
        self.stats_label = ttk.Label(progress_frame, text="Processed: 0 | Failed: 0 | Remaining: 0")
        self.stats_label.grid(row=1, column=1, sticky=tk.E)
        
        # Log Section
        log_frame = ttk.LabelFrame(main_frame, text="Processing Log", padding="10")
        log_frame.grid(row=5, column=0, columnspan=2, sticky=(tk.W, tk.E, tk.N, tk.S), pady=5)
        
        self.log_text = scrolledtext.ScrolledText(log_frame, width=80, height=10)
        self.log_text.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Export buttons
        export_frame = ttk.Frame(main_frame)
        export_frame.grid(row=6, column=0, columnspan=2, pady=5)
        
        ttk.Button(export_frame, text="Export Results", 
                  command=self.export_results).grid(row=0, column=0, padx=5)
        
        # Configure grid weights
        main_frame.columnconfigure(0, weight=1)
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.rowconfigure(5, weight=1)
        log_frame.columnconfigure(0, weight=1)
        log_frame.rowconfigure(0, weight=1)
        
    def connect_to_sap(self):
        try:
            self.log("Connecting to SAP GUI...")
            
            # Connect to SAP GUI
            self.sap_gui_auto = win32com.client.GetObject("SAPGUI")
            self.application = self.sap_gui_auto.GetScriptingEngine
            
            if self.application.Children.Count == 0:
                raise Exception("No SAP GUI connections found. Please open SAP GUI first.")
            
            self.connection = self.application.Children(0)
            
            if self.connection.Children.Count == 0:
                raise Exception("No active SAP sessions found. Please log in to SAP first.")
            
            self.session = self.connection.Children(0)
            
            # Test the connection
            self.session.findById("wnd[0]").maximize
            
            self.connection_status.config(text="Connected", foreground="green")
            self.log("Successfully connected to SAP GUI")
            
        except Exception as e:
            self.connection_status.config(text="Connection Failed", foreground="red")
            self.log(f"Failed to connect to SAP: {str(e)}")
            messagebox.showerror("Connection Error", f"Failed to connect to SAP:\n{str(e)}")
    
    def load_from_csv(self):
        file_path = filedialog.askopenfilename(
            title="Select CSV File",
            filetypes=[("CSV files", "*.csv"), ("Text files", "*.txt"), ("All files", "*.*")]
        )
        
        if file_path:
            try:
                with open(file_path, 'r', newline='', encoding='utf-8') as file:
                    csv_reader = csv.reader(file)
                    parts = []
                    for row in csv_reader:
                        if row:  # Skip empty rows
                            parts.append(row[0].strip())
                
                self.part_text.delete(1.0, tk.END)
                self.part_text.insert(1.0, '\n'.join(parts))
                self.log(f"Loaded {len(parts)} part numbers from CSV file")
                
            except Exception as e:
                messagebox.showerror("File Error", f"Failed to load CSV file:\n{str(e)}")
    
    def load_sample_data(self):
        sample_parts = [
            "839-A03369-001",
            "839-A03373-012", 
            "714-123456-001",
            "715-123456-001",
            "839-A02924-012"
        ]
        self.part_text.delete(1.0, tk.END)
        self.part_text.insert(1.0, '\n'.join(sample_parts))
        self.log("Loaded sample part numbers")
    
    def clear_parts(self):
        self.part_text.delete(1.0, tk.END)
        self.log("Cleared all part numbers")
    
    def start_processing(self):
        if not self.session:
            messagebox.showerror("Error", "Please connect to SAP first")
            return
        
        # Get part numbers
        part_text_content = self.part_text.get(1.0, tk.END).strip()
        if not part_text_content:
            messagebox.showerror("Error", "Please enter part numbers first")
            return
        
        self.part_numbers = [part.strip() for part in part_text_content.split('\n') if part.strip()]
        self.total_parts = len(self.part_numbers)
        
        if self.total_parts == 0:
            messagebox.showerror("Error", "No valid part numbers found")
            return
        
        # Initialize processing variables
        self.current_part_index = 0
        self.processed_parts = []
        self.failed_parts = []
        self.is_processing = True
        
        # Update UI
        self.start_button.config(state="disabled")
        self.stop_button.config(state="normal")
        self.pause_button.config(state="normal")
        
        self.progress.config(maximum=self.total_parts)
        self.progress.config(value=0)
        
        self.log(f"Starting processing of {self.total_parts} part numbers...")
        
        # Start processing in separate thread
        self.processing_thread = threading.Thread(target=self.process_parts)
        self.processing_thread.daemon = True
        self.processing_thread.start()
    
    def process_parts(self):
        # Initialize COM for this thread
        pythoncom.CoInitialize()
        
        # Create SAP connection within this thread
        thread_sap_gui_auto = None
        thread_application = None
        thread_connection = None
        thread_session = None
        
        try:
            # Connect to SAP GUI in this thread
            self.root.after(0, self.log, "Establishing SAP connection in worker thread...")
            
            thread_sap_gui_auto = win32com.client.GetObject("SAPGUI")
            thread_application = thread_sap_gui_auto.GetScriptingEngine
            
            if thread_application.Children.Count == 0:
                raise Exception("No SAP GUI connections found.")
            
            thread_connection = thread_application.Children(0)
            
            if thread_connection.Children.Count == 0:
                raise Exception("No active SAP sessions found.")
            
            thread_session = thread_connection.Children(0)
            
            # Test the connection
            thread_session.findById("wnd[0]").maximize
            self.root.after(0, self.log, "SAP connection established in worker thread")
            
            delay = float(self.delay_var.get())
            max_retries = int(self.retry_var.get())
            
            for i, part_number in enumerate(self.part_numbers):
                if not self.is_processing:
                    break
                
                self.current_part_index = i
                retry_count = 0
                success = False
                
                while retry_count <= max_retries and not success and self.is_processing:
                    try:
                        self.root.after(0, self.update_progress, i, part_number)
                        self.root.after(0, self.log, f"Processing part {i+1}/{self.total_parts}: {part_number}")
                        
                        # Navigate to transaction
                        thread_session.findById("wnd[0]/tbar[0]/okcd").text = "zr423"
                        thread_session.findById("wnd[0]").sendVKey(0)  # Enter key
                        time.sleep(0.5)  # Wait for transaction to load
                        
                        # Enter part number
                        thread_session.findById("wnd[0]/usr/ctxtS_MATNR-LOW").text = part_number
                        thread_session.findById("wnd[0]/usr/ctxtS_MATNR-LOW").setFocus()
                        
                        # Execute
                        thread_session.findById("wnd[0]/tbar[1]/btn[8]").press()
                        time.sleep(1.5)  # Wait for results to load
                        
                        # Check for dialogs and handle them
                        try:
                            # Try to find and press the generate button (btn[45])
                            thread_session.findById("wnd[0]/tbar[1]/btn[45]").press()
                            time.sleep(0.8)
                            
                            # Select radio button and press generate (btn[0])
                            thread_session.findById("wnd[1]/usr/subSUBSCREEN_STEPLOOP:SAPLSPO5:0150/sub:SAPLSPO5:0150/radSPOPLI-SELFLAG[3,0]").select()
                            thread_session.findById("wnd[1]/usr/subSUBSCREEN_STEPLOOP:SAPLSPO5:0150/sub:SAPLSPO5:0150/radSPOPLI-SELFLAG[3,0]").setFocus()
                            time.sleep(0.3)
                            
                            # Press generate button (btn[0])
                            thread_session.findById("wnd[1]/tbar[0]/btn[0]").press()
                            time.sleep(0.8)
                            
                            # Press expand button (btn[7])
                            thread_session.findById("wnd[1]/tbar[0]/btn[7]").press()
                            time.sleep(0.5)
                            
                        except Exception as dialog_error:
                            # If dialog handling fails, just continue
                            self.root.after(0, self.log, f"Dialog handling skipped for {part_number}: {str(dialog_error)}")
                        
                        # Go back to main screen
                        try:
                            thread_session.findById("wnd[0]/tbar[0]/btn[3]").press()
                            time.sleep(0.5)
                        except:
                            # Alternative way to go back
                            try:
                                thread_session.findById("wnd[0]").sendVKey(12)  # F12 key
                                time.sleep(0.5)
                            except:
                                pass
                        
                        success = True
                        self.processed_parts.append(part_number)
                        self.root.after(0, self.log, f"✓ Successfully processed: {part_number}")
                        
                    except Exception as e:
                        retry_count += 1
                        error_msg = f"Error processing {part_number} (attempt {retry_count}): {str(e)}"
                        self.root.after(0, self.log, error_msg)
                        
                        if retry_count > max_retries:
                            self.failed_parts.append((part_number, str(e)))
                            self.root.after(0, self.log, f"✗ Failed to process: {part_number} after {max_retries} retries")
                        else:
                            time.sleep(2)  # Wait before retry
                
                # Update statistics
                self.root.after(0, self.update_stats)
                
                # Delay between parts (if not the last part)
                if i < len(self.part_numbers) - 1 and self.is_processing:
                    time.sleep(delay)
            
        except Exception as thread_connection_error:
            self.root.after(0, self.log, f"Failed to establish SAP connection in worker thread: {str(thread_connection_error)}")
            
        finally:
            # Clean up COM
            pythoncom.CoUninitialize()
        
        # Processing completed
        self.root.after(0, self.processing_completed)
    
    def update_progress(self, index, part_number):
        self.progress.config(value=index + 1)
        self.progress_label.config(text=f"Processing: {part_number}")
    
    def update_stats(self):
        processed = len(self.processed_parts)
        failed = len(self.failed_parts)
        remaining = self.total_parts - processed - failed
        self.stats_label.config(text=f"Processed: {processed} | Failed: {failed} | Remaining: {remaining}")
    
    def processing_completed(self):
        self.is_processing = False
        self.start_button.config(state="normal")
        self.stop_button.config(state="disabled")
        self.pause_button.config(state="disabled")
        
        processed = len(self.processed_parts)
        failed = len(self.failed_parts)
        
        self.log(f"\n=== Processing Completed ===")
        self.log(f"Total parts: {self.total_parts}")
        self.log(f"Successfully processed: {processed}")
        self.log(f"Failed: {failed}")
        
        if failed > 0:
            self.log("Failed parts:")
            for part, error in self.failed_parts:
                self.log(f"  - {part}: {error}")
        
        messagebox.showinfo("Processing Complete", 
                           f"Processing completed!\n\nSuccessful: {processed}\nFailed: {failed}")
    
    def stop_processing(self):
        self.is_processing = False
        self.log("Processing stopped by user")
    
    def pause_processing(self):
        # This is a simple pause implementation
        if self.is_processing:
            self.is_processing = False
            self.pause_button.config(text="Resume")
            self.log("Processing paused")
        else:
            self.is_processing = True
            self.pause_button.config(text="Pause")
            self.log("Processing resumed")
            # Restart processing thread from current position
            self.processing_thread = threading.Thread(target=self.process_remaining_parts)
            self.processing_thread.daemon = True
            self.processing_thread.start()
    
    def process_remaining_parts(self):
        # Continue processing from current position
        remaining_parts = self.part_numbers[self.current_part_index:]
        self.part_numbers = remaining_parts
        self.total_parts = len(remaining_parts)
        self.current_part_index = 0
        
        # The process_parts method will handle COM initialization internally
        self.process_parts()
    
    def export_results(self):
        if not self.processed_parts and not self.failed_parts:
            messagebox.showwarning("No Data", "No processing results to export")
            return
        
        file_path = filedialog.asksaveasfilename(
            title="Save Results",
            defaultextension=".csv",
            filetypes=[("CSV files", "*.csv"), ("All files", "*.*")]
        )
        
        if file_path:
            try:
                with open(file_path, 'w', newline='', encoding='utf-8') as file:
                    writer = csv.writer(file)
                    writer.writerow(["Part Number", "Status", "Error Message"])
                    
                    for part in self.processed_parts:
                        writer.writerow([part, "Success", ""])
                    
                    for part, error in self.failed_parts:
                        writer.writerow([part, "Failed", error])
                
                self.log(f"Results exported to: {file_path}")
                messagebox.showinfo("Export Complete", f"Results exported to:\n{file_path}")
                
            except Exception as e:
                messagebox.showerror("Export Error", f"Failed to export results:\n{str(e)}")
    
    def log(self, message):
        timestamp = datetime.now().strftime("%H:%M:%S")
        log_message = f"[{timestamp}] {message}\n"
        self.log_text.insert(tk.END, log_message)
        self.log_text.see(tk.END)

if __name__ == "__main__":
    root = tk.Tk()
    app = SAPBulkProcessor(root)
    root.mainloop()