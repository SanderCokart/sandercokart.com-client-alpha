const languages = [
    {
        'language': '1C',
        'extension': '1c'
    },
    {
        'language': '4D',
        'extension': '4d'
    },
    {
        'language': 'ABAP',
        'extension': 'sap-abap'
    },
    {
        'language': 'ABNF',
        'extension': 'abnf'
    },
    {
        'language': 'Access logs',
        'extension': 'accesslog'
    },
    {
        'language': 'Ada',
        'extension': 'ada'
    },
    {
        'language': 'Apex',
        'extension': 'apex'
    },
    {
        'language': 'Arduino (C++ w/Arduino libs)',
        'extension': 'arduino'
    },
    {
        'language': 'ARM assembler',
        'extension': 'armasm'
    },
    {
        'language': 'AVR assembler',
        'extension': 'avrasm'
    },
    {
        'language': 'ActionScript',
        'extension': 'actionscript'
    },
    {
        'language': 'Alan IF',
        'extension': 'alan'
    },
    {
        'language': 'Alan',
        'extension': 'ln'
    },
    {
        'language': 'AngelScript',
        'extension': 'angelscript'
    },
    {
        'language': 'Apache',
        'extension': 'apache'
    },
    {
        'language': 'AppleScript',
        'extension': 'applescript'
    },
    {
        'language': 'Arcade',
        'extension': 'arcade'
    },
    {
        'language': 'AsciiDoc',
        'extension': 'asciidoc'
    },
    {
        'language': 'AspectJ',
        'extension': 'aspectj'
    },
    {
        'language': 'AutoHotkey',
        'extension': 'autohotkey'
    },
    {
        'language': 'AutoIt',
        'extension': 'autoit'
    },
    {
        'language': 'Awk',
        'extension': 'awk'
    },
    {
        'language': 'Bash',
        'extension': 'bash'
    },
    {
        'language': 'Basic',
        'extension': 'basic'
    },
    {
        'language': 'BBCode',
        'extension': 'bbcode'
    },
    {
        'language': 'Blade (Laravel)',
        'extension': 'blade'
    },
    {
        'language': 'BNF',
        'extension': 'bnf'
    },
    {
        'language': 'Brainfuck',
        'extension': 'brainfuck'
    },
    {
        'language': 'C#',
        'extension': 'csharp'
    },
    {
        'language': 'C',
        'extension': 'c'
    },
    {
        'language': 'C++',
        'extension': 'cpp'
    },
    {
        'language': 'C/AL',
        'extension': 'cal'
    },
    {
        'language': 'Cache Object Script',
        'extension': 'cos'
    },
    {
        'language': 'CMake',
        'extension': 'cmake'
    },
    {
        'language': 'COBOL',
        'extension': 'cobol'
    },
    {
        'language': 'Coq',
        'extension': 'coq'
    },
    {
        'language': 'CSP',
        'extension': 'csp'
    },
    {
        'language': 'CSS',
        'extension': 'css'
    },
    {
        'language': 'Cap’n Proto',
        'extension': 'capnproto'
    },
    {
        'language': 'Chaos',
        'extension': 'chaos'
    },
    {
        'language': 'Chapel',
        'extension': 'chapel'
    },
    {
        'language': 'Cisco CLI',
        'extension': 'cisco'
    },
    {
        'language': 'Clojure',
        'extension': 'clojure'
    },
    {
        'language': 'CoffeeScript',
        'extension': 'coffeescript'
    },
    {
        'language': 'CpcdosC+',
        'extension': 'cpc'
    },
    {
        'language': 'Crmsh',
        'extension': 'crmsh'
    },
    {
        'language': 'Crystal',
        'extension': 'crystal'
    },
    {
        'language': 'cURL',
        'extension': 'curl'
    },
    {
        'language': 'Cypher (Neo4j)',
        'extension': 'cypher'
    },
    {
        'language': 'D',
        'extension': 'd'
    },
    {
        'language': 'Dafny',
        'extension': 'dafny'
    },
    {
        'language': 'Dart',
        'extension': 'dart'
    },
    {
        'language': 'Delphi',
        'extension': 'dpr'
    },
    {
        'language': 'Diff',
        'extension': 'diff'
    },
    {
        'language': 'Django',
        'extension': 'django'
    },
    {
        'language': 'DNS Zone file',
        'extension': 'dns'
    },
    {
        'language': 'Dockerfile',
        'extension': 'dockerfile'
    },
    {
        'language': 'DOS',
        'extension': 'dos'
    },
    {
        'language': 'dsconfig',
        'extension': 'dsconfig'
    },
    {
        'language': 'DTS (Device Tree)',
        'extension': 'dts'
    },
    {
        'language': 'Dust',
        'extension': 'dust'
    },
    {
        'language': 'Dylan',
        'extension': 'dylan'
    },
    {
        'language': 'EBNF',
        'extension': 'ebnf'
    },
    {
        'language': 'Elixir',
        'extension': 'elixir'
    },
    {
        'language': 'Elm',
        'extension': 'elm'
    },
    {
        'language': 'Erlang',
        'extension': 'erlang'
    },
    {
        'language': 'Excel',
        'extension': 'excel'
    },
    {
        'language': 'Extempore',
        'extension': 'extempore'
    },
    {
        'language': 'F#',
        'extension': 'fsharp'
    },
    {
        'language': 'FIX',
        'extension': 'fix'
    },
    {
        'language': 'Fortran',
        'extension': 'fortran'
    },
    {
        'language': 'FunC',
        'extension': 'func'
    },
    {
        'language': 'G-Code',
        'extension': 'gcode'
    },
    {
        'language': 'Gams',
        'extension': 'gams'
    },
    {
        'language': 'GAUSS',
        'extension': 'gauss'
    },
    {
        'language': 'GDScript',
        'extension': 'godot'
    },
    {
        'language': 'Gherkin',
        'extension': 'gherkin'
    },
    {
        'language': 'Glimmer and EmberJS',
        'extension': 'hbs'
    },
    {
        'language': 'GN for Ninja',
        'extension': 'gn'
    },
    {
        'language': 'Go',
        'extension': 'go'
    },
    {
        'language': 'Grammatical Framework',
        'extension': 'gf'
    },
    {
        'language': 'Golo',
        'extension': 'golo'
    },
    {
        'language': 'Gradle',
        'extension': 'gradle'
    },
    {
        'language': 'GraphQL',
        'extension': 'graphql'
    },
    {
        'language': 'Groovy',
        'extension': 'groovy'
    },
    {
        'language': 'GSQL',
        'extension': 'gsql'
    },
    {
        'language': 'HTML, XML',
        'extension': 'xml'
    },
    {
        'language': 'HTTP',
        'extension': 'http'
    },
    {
        'language': 'Haml',
        'extension': 'haml'
    },
    {
        'language': 'Handlebars',
        'extension': 'handlebars'
    },
    {
        'language': 'Haskell',
        'extension': 'haskell'
    },
    {
        'language': 'Haxe',
        'extension': 'haxe'
    },
    {
        'language': 'High-level shader language',
        'extension': 'hlsl'
    },
    {
        'language': 'Hy',
        'extension': 'hy'
    },
    {
        'language': 'Ini, TOML',
        'extension': 'ini'
    },
    {
        'language': 'Inform7',
        'extension': 'inform7'
    },
    {
        'language': 'IRPF90',
        'extension': 'irpf90'
    },
    {
        'language': 'JSON',
        'extension': 'json'
    },
    {
        'language': 'Java',
        'extension': 'java'
    },
    {
        'language': 'JavaScript',
        'extension': 'javascript'
    },
    {
        'language': 'Jolie',
        'extension': 'jolie'
    },
    {
        'language': 'Julia',
        'extension': 'julia'
    },
    {
        'language': 'Kotlin',
        'extension': 'kotlin'
    },
    {
        'language': 'LaTeX',
        'extension': 'tex'
    },
    {
        'language': 'Leaf',
        'extension': 'leaf'
    },
    {
        'language': 'Lean',
        'extension': 'lean'
    },
    {
        'language': 'Lasso',
        'extension': 'lasso'
    },
    {
        'language': 'Less',
        'extension': 'less'
    },
    {
        'language': 'LDIF',
        'extension': 'ldif'
    },
    {
        'language': 'Lisp',
        'extension': 'lisp'
    },
    {
        'language': 'LiveCode Server',
        'extension': 'livecodeserver'
    },
    {
        'language': 'LookML',
        'extension': 'lookml'
    },
    {
        'language': 'Lua',
        'extension': 'lua'
    },
    {
        'language': 'Macaulay2',
        'extension': 'macaulay2'
    },
    {
        'language': 'Makefile',
        'extension': 'makefile'
    },
    {
        'language': 'Markdown',
        'extension': 'markdown'
    },
    {
        'language': 'Mathematica',
        'extension': 'mathematica'
    },
    {
        'language': 'Matlab',
        'extension': 'matlab'
    },
    {
        'language': 'Maxima',
        'extension': 'maxima'
    },
    {
        'language': 'Maya Embedded Language',
        'extension': 'mel'
    },
    {
        'language': 'Mercury',
        'extension': 'mercury'
    },
    {
        'language': 'mIRC Scripting Language',
        'extension': 'mirc'
    },
    {
        'language': 'Mizar',
        'extension': 'mizar'
    },
    {
        'language': 'MKB',
        'extension': 'mkb'
    },
    {
        'language': 'MLIR',
        'extension': 'mlir'
    },
    {
        'language': 'Mojolicious',
        'extension': 'mojolicious'
    },
    {
        'language': 'Monkey',
        'extension': 'monkey'
    },
    {
        'language': 'Moonscript',
        'extension': 'moonscript'
    },
    {
        'language': 'N1QL',
        'extension': 'n1ql'
    },
    {
        'language': 'NSIS',
        'extension': 'nsis'
    },
    {
        'language': 'Never',
        'extension': 'never'
    },
    {
        'language': 'Nginx',
        'extension': 'nginx'
    },
    {
        'language': 'Nim',
        'extension': 'nim'
    },
    {
        'language': 'Nix',
        'extension': 'nix'
    },
    {
        'language': 'Oak',
        'extension': 'oak'
    },
    {
        'language': 'Object Constraint Language',
        'extension': 'ocl'
    },
    {
        'language': 'OCaml',
        'extension': 'ocaml'
    },
    {
        'language': 'Objective C',
        'extension': 'objectivec'
    },
    {
        'language': 'OpenGL Shading Language',
        'extension': 'glsl'
    },
    {
        'language': 'OpenSCAD',
        'extension': 'openscad'
    },
    {
        'language': 'Oracle Rules Language',
        'extension': 'ruleslanguage'
    },
    {
        'language': 'Oxygene',
        'extension': 'oxygene'
    },
    {
        'language': 'PF',
        'extension': 'pf'
    },
    {
        'language': 'PHP',
        'extension': 'php'
    },
    {
        'language': 'Papyrus',
        'extension': 'papyrus'
    },
    {
        'language': 'Parser3',
        'extension': 'parser3'
    },
    {
        'language': 'Perl',
        'extension': 'perl'
    },
    {
        'language': 'Pine Script',
        'extension': 'pine'
    },
    {
        'language': 'Plaintext',
        'extension': 'plaintext'
    },
    {
        'language': 'Pony',
        'extension': 'pony'
    },
    {
        'language': 'PostgreSQL & PL/pgSQL',
        'extension': 'pgsql'
    },
    {
        'language': 'PowerShell',
        'extension': 'powershell'
    },
    {
        'language': 'Processing',
        'extension': 'processing'
    },
    {
        'language': 'Prolog',
        'extension': 'prolog'
    },
    {
        'language': 'Properties',
        'extension': 'properties'
    },
    {
        'language': 'Protocol Buffers',
        'extension': 'protobuf'
    },
    {
        'language': 'Puppet',
        'extension': 'puppet'
    },
    {
        'language': 'Python',
        'extension': 'python'
    },
    {
        'language': 'Python profiler results',
        'extension': 'profile'
    },
    {
        'language': 'Python REPL',
        'extension': 'python-repl'
    },
    {
        'language': 'Q#',
        'extension': 'qsharp'
    },
    {
        'language': 'Q',
        'extension': 'k'
    },
    {
        'language': 'QML',
        'extension': 'qml'
    },
    {
        'language': 'R',
        'extension': 'r'
    },
    {
        'language': 'Razor CSHTML',
        'extension': 'cshtml'
    },
    {
        'language': 'ReasonML',
        'extension': 'reasonml'
    },
    {
        'language': 'Rebol & Red',
        'extension': 'redbol'
    },
    {
        'language': 'RenderMan RIB',
        'extension': 'rib'
    },
    {
        'language': 'RenderMan RSL',
        'extension': 'rsl'
    },
    {
        'language': 'RiScript',
        'extension': 'risc'
    },
    {
        'language': 'Roboconf',
        'extension': 'graph'
    },
    {
        'language': 'Robot Framework',
        'extension': 'robot'
    },
    {
        'language': 'RPM spec files',
        'extension': 'rpm-specfile'
    },
    {
        'language': 'Ruby',
        'extension': 'ruby'
    },
    {
        'language': 'Rust',
        'extension': 'rust'
    },
    {
        'language': 'SAS',
        'extension': 'SAS'
    },
    {
        'language': 'SCSS',
        'extension': 'scss'
    },
    {
        'language': 'SQL',
        'extension': 'sql'
    },
    {
        'language': 'STEP Part 21',
        'extension': 'p21'
    },
    {
        'language': 'Scala',
        'extension': 'scala'
    },
    {
        'language': 'Scheme',
        'extension': 'scheme'
    },
    {
        'language': 'Scilab',
        'extension': 'scilab'
    },
    {
        'language': 'Shape Expressions',
        'extension': 'shexc'
    },
    {
        'language': 'Shell',
        'extension': 'shell'
    },
    {
        'language': 'Smali',
        'extension': 'smali'
    },
    {
        'language': 'Smalltalk',
        'extension': 'smalltalk'
    },
    {
        'language': 'SML',
        'extension': 'sml'
    },
    {
        'language': 'Solidity',
        'extension': 'solidity'
    },
    {
        'language': 'Splunk SPL',
        'extension': 'spl'
    },
    {
        'language': 'Stan',
        'extension': 'stan'
    },
    {
        'language': 'Stata',
        'extension': 'stata'
    },
    {
        'language': 'Structured Text',
        'extension': 'iecst'
    },
    {
        'language': 'Stylus',
        'extension': 'stylus'
    },
    {
        'language': 'SubUnit',
        'extension': 'subunit'
    },
    {
        'language': 'Supercollider',
        'extension': 'supercollider'
    },
    {
        'language': 'Svelte',
        'extension': 'svelte'
    },
    {
        'language': 'Swift',
        'extension': 'swift'
    },
    {
        'language': 'Tcl',
        'extension': 'tcl'
    },
    {
        'language': 'Terraform (HCL)',
        'extension': 'terraform'
    },
    {
        'language': 'Test Anything Protocol',
        'extension': 'tap'
    },
    {
        'language': 'Thrift',
        'extension': 'thrift'
    },
    {
        'language': 'Toit',
        'extension': 'toit'
    },
    {
        'language': 'TP',
        'extension': 'tp'
    },
    {
        'language': 'Transact-SQL',
        'extension': 'tsql'
    },
    {
        'language': 'Twig',
        'extension': 'twig'
    },
    {
        'language': 'TypeScript',
        'extension': 'typescript'
    },
    {
        'language': 'Unicorn Rails log',
        'extension': 'unicorn-rails-log'
    },
    {
        'language': 'VB.Net',
        'extension': 'vbnet'
    },
    {
        'language': 'VBA',
        'extension': 'vba'
    },
    {
        'language': 'VBScript',
        'extension': 'vbscript'
    },
    {
        'language': 'VHDL',
        'extension': 'vhdl'
    },
    {
        'language': 'Vala',
        'extension': 'vala'
    },
    {
        'language': 'Verilog',
        'extension': 'verilog'
    },
    {
        'language': 'Vim Script',
        'extension': 'vim'
    },
    {
        'language': 'X#',
        'extension': 'xsharp'
    },
    {
        'language': 'X++',
        'extension': 'axapta'
    },
    {
        'language': 'x86 Assembly',
        'extension': 'x86asm'
    },
    {
        'language': 'XL',
        'extension': 'xl'
    },
    {
        'language': 'XQuery',
        'extension': 'xquery'
    },
    {
        'language': 'YAML',
        'extension': 'yml'
    },
    {
        'language': 'ZenScript',
        'extension': 'zenscript'
    },
    {
        'language': 'Zephir',
        'extension': 'zephir'
    },
    {
        'language': 'LiveScript',
        'extension': 'livescript'
    }
];

export default languages;