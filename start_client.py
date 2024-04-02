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
            
def start_client():
    os.chdir(os.path.join(os.getcwd(), "client"))
    
    run_command('npm start')
    
    os.chdir("..")

if __name__ == "__main__":
    start_client()