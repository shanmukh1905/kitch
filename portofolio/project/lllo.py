import csv
import random
import string

# Function to generate a random string of alphanumeric characters
def generate_random_string(length):
    letters_and_digits = string.ascii_letters + string.digits
    return ''.join(random.choice(letters_and_digits) for i in range(length))

# Define the number of entries
num_entries = 5  # You can change this value as needed

# Generate random data for regno and password fields
data = []
for _ in range(num_entries):
    regno = generate_random_string(6)  # Generating a random string of length 6
    password = generate_random_string(10)  # Generating a random string of length 10
    data.append({"regno": regno, "password": password, "salt": "", "hash": ""})

# Define CSV file path
csv_file = "credentials.csv"

# Define CSV fieldnames
fieldnames = ["regno", "password", "salt", "hash"]

# Write data to CSV file
with open(csv_file, mode="w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    # Write headers
    writer.writeheader()
    
    # Write data
    writer.writerows(data)

print("CSV file created successfully:", csv_file)
