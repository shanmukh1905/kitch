import re

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
