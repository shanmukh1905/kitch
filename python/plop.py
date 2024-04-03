
class Tokenizer:
    def __init__(self):
        self.token_patterns = [
            ('COMMENT', r'\/\/.*'),                  # Comments
            ('KEYWORD', r'కార్యం|కార్య|వ్యాఖ్య|కార్య|నియంత్రణ|వ్యాఖ్యలు|అసెర్ట్|అర్థమాడు|నిర్వచన|లూప్|అంకె|అభివ్యక్తి|గణకము|అంకగణితం|సంఖ్య|ఆపరేటర్|అన్నింటి'),
            ('IDENTIFIER', r'[a-zA-Z_]\w*'),         # Identifiers
            ('NUMBER', r'\d+'),                      # Numbers
            ('STRING', r'\'[^\']*\''),               # Strings
            ('ASSIGN', r'\='),                       # Assignment operator
            ('OP', r'\+|\-|\*|\/'),                  # Arithmetic operators
            ('LPAREN', r'\('),                       # Left parenthesis
            ('RPAREN', r'\)'),                       # Right parenthesis
            ('LBRACE', r'\{'),                       # Left brace
            ('RBRACE', r'\}'),                       # Right brace
            ('COMMA', r'\,'),                        # Comma
            ('SEMICOLON', r'\;'),                    # Semicolon
            ('COMPARE', r'\=\=|\!\=|\>|\<|\>\=|\<\='), # Comparison operators
        ]
        # Compile regex patterns
        self.patterns = [(t, re.compile(p)) for t, p in self.token_patterns]

    def tokenize(self, code):
        tokens = []
        while code:
            match = None
            for token_type, pattern in self.patterns:
                match = pattern.match(code)
                if match:
                    value = match.group(0)
                    if token_type != 'COMMENT':  # Ignore comments
                        tokens.append((token_type, value))
                    code = code[match.end():]
                    break
            if not match:
                raise ValueError('Invalid syntax: %s' % code)
        return tokens

class CFG:
    def __init__(self):
        self.rules = {
    "కోడ్": ["కార్యంలు", "నియంత్రణలు", "అర్థమాడు", "నియమాలు"],
            "కార్యంలు": ["కార్యం వ్యాఖ్యన", "కార్యం చరిత్ర"],
            "కార్యం": ["'కార్యం' లేదా 'కార్య' identifier '(' అంకె ')'"],
            "వ్యాఖ్యన": ["'{' కోడ్ '}'", "'{' '}'"],
            "చరిత్ర": ["'{' స్టేటిమెంటులు '}'"],
            "స్టేటిమెంటులు": ["స్టేటిమెంటు స్టేటిమెంటులు", "స్టేటిమెంటు"],
            "స్టేటిమెంటు": ["వ్యాఖ్యలు", "అసెర్ట్", "లూప్", "అర్థమాడు", "నిర్వచన", "అదిని", "రద్దు", "రద్దు identifier"],
            "అసెర్ట్": ["'నిశ్చయించండి' '(' అభివ్యక్తి ')' ';'"],
            "అర్థమాడు": ["అభివ్యక్తి ';'"],
            "నిర్వచన": ["'నిర్వచన' identifier '=' అభివ్యక్తి ';'"],
            "లూప్": ["'లూప్' '(' అవయవము ')' స్టేటిమెంటు", "'పునరావృత్తి' '(' అభివ్యక్తి ')' స్టేటిమెంటు"],
            "అభివ్యక్తి": ["అంకగణితం", "identifier", "అభివ్యక్తి ఆపరేటర్ అభివ్యక్తి", "'(' అభివ్యక్తి ')'", "'నిజమైన' '(' అభివ్యక్తి ')'", "కార్యం"],
            "అంకగణితం": ["అభివ్యక్తి గణకము అభివ్యక్తి", "అభివ్యక్తి అంకగణిత అభివ్యక్తి"],
            "గణకము": ["'+'", "'-'", "'*'", "'/'"],
            "అంకగణిత": ["'మూల'", "'లఘు'", "సంఖ్య", "అభివ్యక్తి"],
            "అభివ్యక్తిలు": ["అభివ్యక్తి ',' అభివ్యక్తిలు", "అభివ్యక్తి"],
            "ఆపరేటర్": ["'=='", "'!='", "'>'", "'<'", "'>='", "'<='"],
            "అన్నింటి": ["'అన్నింటి' identifier '{' స్టేటిమెంటులు '}'"],
        

        }
    pass


class ASTNode:
     def emit_llvm_ir(self):
       pass

class ProgramNode(ASTNode):
    def __init__(self, statements):
        self.statements = statements
     
    def emit_llvm_ir(self):
        llvm_ir_code = ""
        for statement in self.statements:
            llvm_ir_code += statement.emit_llvm_ir() + "\n"
        return llvm_ir_code
    
class FunctionDefinitionNode(ASTNode):
    def __init__(self, name, parameters, body):
        self.name = name
        self.parameters = parameters
        self.body = body
        
    def emit_llvm_ir(self):
        llvm_ir_code = f"define void @{self.name}("
        parameters_str = ", ".join(self.parameters)
        llvm_ir_code += parameters_str + ") {\n"
        llvm_ir_code += self.body.emit_llvm_ir() + "\n"
        llvm_ir_code += "}\n"
        return llvm_ir_code
    
class ControlStructureNode(ASTNode):
    def __init__(self, initialization, condition, increment, body):
        self.initialization = initialization
        self.condition = condition
        self.increment = increment
        self.body = body
    
    def emit_llvm_ir(self):
        llvm_ir_code = ""
        llvm_ir_code += self.initialization.emit_llvm_ir() + "\n"
        llvm_ir_code += f"br label %loop_condition\n"
        llvm_ir_code += "loop_condition:\n"
        llvm_ir_code += self.condition.emit_llvm_ir() + "\n"
        llvm_ir_code += f"br i1 %condition_result, label %loop_body, label %loop_end\n"
        llvm_ir_code += "loop_body:\n"
        llvm_ir_code += self.body.emit_llvm_ir() + "\n"
        llvm_ir_code += self.increment.emit_llvm_ir() + "\n"
        llvm_ir_code += f"br label %loop_condition\n"
        llvm_ir_code += "loop_end:\n"
        return llvm_ir_code
    
class AssignmentNode(ASTNode):
    def __init__(self, identifier, expression):
        self.identifier = identifier
        self.expression = expression
        
    def emit_llvm_ir(self):
        return f"{self.identifier} = {self.expression.emit_llvm_ir()}"

class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.current_token_index = 0

    def parse(self):
        return self.program()

    def program(self):
        statements = []
        while self.current_token_index < len(self.tokens):
            statements.append(self.statement())
        return ProgramNode(statements)

    def statement(self):
        token_type, token_value = self.tokens[self.current_token_index]
        if token_type == 'KEYWORD':
            keyword = token_value
            if keyword == 'కార్యం':
                return self.function_definition()
            elif keyword == 'నియంత్రణ':
                return self.control_structure()
            else:
                raise SyntaxError('Invalid keyword: %s' % keyword)
        else:
            raise SyntaxError('Unexpected token: %s' % token_type)

    def function_definition(self):
        self.consume('KEYWORD')
        name = self.consume('IDENTIFIER')
        self.consume('LPAREN')
        parameters = []
        while self.peek()[0] != 'RPAREN':
            parameters.append(self.consume('IDENTIFIER'))
            if self.peek()[0] == 'COMMA':
                self.consume('COMMA')
        self.consume('RPAREN')
        self.consume('LBRACE')
        body = self.program()
        self.consume('RBRACE')
        return FunctionDefinitionNode(name, parameters, body)

    def control_structure(self):
        self.consume('KEYWORD')
        self.consume('LPAREN')
        initialization = self.assignment()
        self.consume('SEMICOLON')
        condition = self.expression()
        self.consume('SEMICOLON')
        increment = self.assignment()
        self.consume('RPAREN')
        self.consume('LBRACE')
        body = self.program()
        self.consume('RBRACE')
        return ControlStructureNode(initialization, condition, increment, body)

    def assignment(self):
        identifier = self.consume('IDENTIFIER')
        self.consume('ASSIGN')
        expression = self.expression()
        self.consume('SEMICOLON')
        return AssignmentNode(identifier, expression)

    def expression(self):
        # Expression parsing goes here
        pass

    def peek(self):
        if self.current_token_index < len(self.tokens):
            return self.tokens[self.current_token_index]
        else:
            return None

    def consume(self, expected_token_type):
        token_type, token_value = self.tokens[self.current_token_index]
        if token_type == expected_token_type:
            self.current_token_index += 1
            return token_value
        else:
            raise SyntaxError('Expected token type: %s, but got: %s' % (expected_token_type, token_type))

class LLVMInstruction:
    def __init__(self, code):
        self.code = code

    def emit(self):
        return self.code
class LLVMFunction(LLVMInstruction):
    def __init__(self, name, parameters, body):
        self.name = name
        self.parameters = parameters
        self.body = body




def emit_llvm_ir(program_node):
    return program_node.emit_llvm_ir()

llvm_ir_code = emit_llvm_ir(program_ast)

def emit(self):
        parameters_str = ", ".join(self.parameters)
        body_str = "\n".join(instruction.emit() for instruction in self.body)
        return f"define void @{self.name}({parameters_str}) {{\n{body_str}\n}}"
