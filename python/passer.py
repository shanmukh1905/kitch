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
