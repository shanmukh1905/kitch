import re

def read_cif(file_path):
    """
    Read the CIF file and extract relevant data.
    """
    con = []
    x, y, z = [], [], []
    line1 = []
    line2 = []
    
    with open(file_path, "r") as f:
        for line in f:
            if re.search("^([#_](?!END)).*", line):
                con.append(line)
            elif re.search("^[A-Z]", line):
                parts = line.strip().split()
                line1.append(parts[0])
                line2.append(parts[1])
                x_coord = float(parts[2])
                y_coord = float(parts[3])
                z_coord = float(parts[4])
                x.append(x_coord)
                y.append(y_coord)
                z.append(z_coord)
    
    return con, line1, line2, x, y, z

def modify_coordinates(x, y, z):
    """
    Modify the coordinates.
    """
    x1, y1, z1 = [], [], []
    for i, j, k in zip(x, y, z):
        x2 = 0.5 - i
        y2 = -j
        z2 = 0.5 + k
        x1.append(round(x2, 6))
        y1.append(round(y2, 6))
        z1.append(round(z2, 6))
    
    return x1, y1, z1

def write_output(con, line1, line2, x1, y1, z1, output_path):
    """
    Write the modified data to the output CIF file.
    """
    with open(output_path, 'w') as f:
        for line in con:
            f.write(line + "\n")
        
        for i in range(len(x1)):
            f.write(f"{line1[i]}\t{line2[i]}\t{x1[i]}\t{y1[i]}\t{z1[i]}\n")
        
        f.write("#END")

def process_cif(input_path, output_path):
    """
    Process CIF file.
    """
    con, line1, line2, x, y, z = read_cif(input_path)
    x1, y1, z1 = modify_coordinates(x, y, z)
    write_output(con, line1, line2, x1, y1, z1, output_path)

# Usage
input_path = "/content/a.cif"
output_path = "/content/output.cif"
process_cif(input_path, output_path)
