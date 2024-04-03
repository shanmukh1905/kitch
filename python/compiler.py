import sys
from prog import Tokenizer, Parser, emit_llvm_ir

def main(input_file, output_file):
    # Read source code from input file
    with open(input_file, 'r') as f:
        source_code = f.read()

    # Tokenize the source code
    tokenizer = Tokenizer()
    tokens = tokenizer.tokenize(source_code)

    # Parse tokens into an AST
    parser = Parser(tokens)
    ast = parser.parse()

    # Generate LLVM IR code from the AST
    llvm_ir_code = emit_llvm_ir(ast)

    # Write LLVM IR code to output file
    with open(output_file, 'w') as f:
        f.write(llvm_ir_code)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py input_file output_file")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    main(input_file, output_file)
