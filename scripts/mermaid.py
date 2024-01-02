#!/usr/bin/env python3

# Tested only for macOS
# Full instructions: https://chat.openai.com/c/aec09321-04d6-4274-9957-6df1a15df499

import os
import sys

def folder_to_mermaid(folder_path, ignore_list):
    mermaid_code = "Mermaid Folders:\n"

    def process_folder(folder_path, indent):
        nonlocal mermaid_code
        items = os.listdir(folder_path)
        for item in items:
            if item in ignore_list:
                continue

            item_path = os.path.join(folder_path, item)
            if os.path.isdir(item_path):
                mermaid_code += f'{indent}"{os.path.basename(item_path)}"\n'
                mermaid_code += f'{indent}"{os.path.basename(folder_path)}" --> "{os.path.basename(item_path)}"\n'
                process_folder(item_path, indent + '  ')
            else:
                mermaid_code += f'{indent}"{os.path.basename(folder_path)}" --> "{os.path.basename(item_path)}"\n'

    process_folder(folder_path, '')

    return mermaid_code

def load_ignore_list(ignore_file_path):
    ignore_list = []
    if os.path.exists(ignore_file_path):
        with open(ignore_file_path, "r") as f:
            ignore_list = [line.strip() for line in f.readlines()]
    return ignore_list

def main():
    if len(sys.argv) != 2:
        print("Usage: {} <folder_path>".format(sys.argv[0]))
        sys.exit(1)

    folder_path = sys.argv[1]
    if not os.path.exists(folder_path):
        print("Error: The specified folder does not exist.")
        sys.exit(1)

    ignore_list = load_ignore_list(".mermaidignore")
    mermaid_chart = folder_to_mermaid(folder_path, ignore_list)

    with open("project.mermaid", "w") as f:
        f.write(mermaid_chart)

if __name__ == "__main__":
    main()
