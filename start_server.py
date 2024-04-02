import os
import subprocess
import sys

def run_command(command, cwd=None):
    """
    Run a shell command in a specified directory and print the output.
    """
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, cwd=cwd)
    while True:
        output = process.stdout.readline()
        if not output and process.poll() is not None:
            break
        if output:
            print(output.strip().decode())
            
def start_server(path=os.path.join(os.getcwd(), "server")):

    if not os.path.exists(os.path.join(path, 'venv')):
        print("Missing venv")
        exit(1)

    print("Activating the virtual environment")
    if sys.platform == "win32":
        # Windows requires a different command to activate the virtual environment
        run_command(f'cd {path} && .\\venv\\Scripts\\activate && uvicorn main:app')
    else:
        # Linux and macOS use this command
        run_command(f'cd {path} && . venv/bin/activate && uvicorn main:app')

if __name__ == "__main__":
    start_server()
