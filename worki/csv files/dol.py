import csv

# Define the field names
field_names = [
    'department',
    'project_name',
    'project_details',
    'status',
    'name_of_faculty',
    'email_id',
    'contact',
    'cabin'
]

# Sample data (you can replace this with your actual data)
data = [
    {'department': 'Computer Science', 'project_name': 'Project A', 'project_details': 'Details A', 'status': 'Active', 'name_of_faculty': 'John Doe', 'email_id': 'john@example.com', 'contact': '1234567890', 'cabin': 'C1'},
    {'department': 'Electrical/Electronics', 'project_name': 'Project B', 'project_details': 'Details B', 'status': 'Inactive', 'name_of_faculty': 'Jane Doe', 'email_id': 'jane@example.com', 'contact': '9876543210', 'cabin': 'C2'},
    # Add more data as needed
]

# Specify the CSV file name
csv_file = 'project_data.csv'

# Write data to CSV file
with open(csv_file, 'w', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=field_names)
    writer.writeheader()
    for row in data:
        writer.writerow(row)

print(f'CSV file "{csv_file}" created successfully.')
