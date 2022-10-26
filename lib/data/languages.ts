const languages = [
    {
        'language': '1C',
        'extensions': '1c'
    },
    {
        'language': '4D',
        'extensions': '4d'
    },
    {
        'language': 'ABAP',
        'extensions': 'sap-abap'
    },
    {
        'language': 'ABNF',
        'extensions': 'abnf'
    },
    {
        'language': 'Access logs',
        'extensions': 'accesslog'
    },
    {
        'language': 'Ada',
        'extensions': 'ada'
    },
    {
        'language': 'Apex',
        'extensions': 'apex'
    },
    {
        'language': 'Arduino (C++ w/Arduino libs)',
        'extensions': 'arduino'
    },
    {
        'language': 'ARM assembler',
        'extensions': 'armasm'
    },
    {
        'language': 'AVR assembler',
        'extensions': 'avrasm'
    },
    {
        'language': 'ActionScript',
        'extensions': 'actionscript'
    },
    {
        'language': 'Alan IF',
        'extensions': 'alan'
    },
    {
        'language': 'Alan',
        'extensions': 'ln'
    },
    {
        'language': 'AngelScript',
        'extensions': 'angelscript'
    },
    {
        'language': 'Apache',
        'extensions': 'apache'
    },
    {
        'language': 'AppleScript',
        'extensions': 'applescript'
    },
    {
        'language': 'Arcade',
        'extensions': 'arcade'
    },
    {
        'language': 'AsciiDoc',
        'extensions': 'asciidoc'
    },
    {
        'language': 'AspectJ',
        'extensions': 'aspectj'
    },
    {
        'language': 'AutoHotkey',
        'extensions': 'autohotkey'
    },
    {
        'language': 'AutoIt',
        'extensions': 'autoit'
    },
    {
        'language': 'Awk',
        'extensions': 'awk'
    },
    {
        'language': 'Bash',
        'extensions': 'bash'
    },
    {
        'language': 'Basic',
        'extensions': 'basic'
    },
    {
        'language': 'BBCode',
        'extensions': 'bbcode'
    },
    {
        'language': 'Blade (Laravel)',
        'extensions': 'blade'
    },
    {
        'language': 'BNF',
        'extensions': 'bnf'
    },
    {
        'language': 'Brainfuck',
        'extensions': 'brainfuck'
    },
    {
        'language': 'C#',
        'extensions': 'csharp'
    },
    {
        'language': 'C',
        'extensions': 'c'
    },
    {
        'language': 'C++',
        'extensions': 'cpp'
    },
    {
        'language': 'C/AL',
        'extensions': 'cal'
    },
    {
        'language': 'Cache Object Script',
        'extensions': 'cos'
    },
    {
        'language': 'CMake',
        'extensions': 'cmake'
    },
    {
        'language': 'COBOL',
        'extensions': 'cobol'
    },
    {
        'language': 'Coq',
        'extensions': 'coq'
    },
    {
        'language': 'CSP',
        'extensions': 'csp'
    },
    {
        'language': 'CSS',
        'extensions': 'css'
    },
    {
        'language': 'Cap’n Proto',
        'extensions': 'capnproto'
    },
    {
        'language': 'Chaos',
        'extensions': 'chaos'
    },
    {
        'language': 'Chapel',
        'extensions': 'chapel'
    },
    {
        'language': 'Cisco CLI',
        'extensions': 'cisco'
    },
    {
        'language': 'Clojure',
        'extensions': 'clojure'
    },
    {
        'language': 'CoffeeScript',
        'extensions': 'coffeescript'
    },
    {
        'language': 'CpcdosC+',
        'extensions': 'cpc'
    },
    {
        'language': 'Crmsh',
        'extensions': 'crmsh'
    },
    {
        'language': 'Crystal',
        'extensions': 'crystal'
    },
    {
        'language': 'cURL',
        'extensions': 'curl'
    },
    {
        'language': 'Cypher (Neo4j)',
        'extensions': 'cypher'
    },
    {
        'language': 'D',
        'extensions': 'd'
    },
    {
        'language': 'Dafny',
        'extensions': 'dafny'
    },
    {
        'language': 'Dart',
        'extensions': 'dart'
    },
    {
        'language': 'Delphi',
        'extensions': 'dpr'
    },
    {
        'language': 'Diff',
        'extensions': 'diff'
    },
    {
        'language': 'Django',
        'extensions': 'django'
    },
    {
        'language': 'DNS Zone file',
        'extensions': 'dns'
    },
    {
        'language': 'Dockerfile',
        'extensions': 'dockerfile'
    },
    {
        'language': 'DOS',
        'extensions': 'dos'
    },
    {
        'language': 'dsconfig',
        'extensions': 'dsconfig'
    },
    {
        'language': 'DTS (Device Tree)',
        'extensions': 'dts'
    },
    {
        'language': 'Dust',
        'extensions': 'dust'
    },
    {
        'language': 'Dylan',
        'extensions': 'dylan'
    },
    {
        'language': 'EBNF',
        'extensions': 'ebnf'
    },
    {
        'language': 'Elixir',
        'extensions': 'elixir'
    },
    {
        'language': 'Elm',
        'extensions': 'elm'
    },
    {
        'language': 'Erlang',
        'extensions': 'erlang'
    },
    {
        'language': 'Excel',
        'extensions': 'excel'
    },
    {
        'language': 'Extempore',
        'extensions': 'extempore'
    },
    {
        'language': 'F#',
        'extensions': 'fsharp'
    },
    {
        'language': 'FIX',
        'extensions': 'fix'
    },
    {
        'language': 'Fortran',
        'extensions': 'fortran'
    },
    {
        'language': 'FunC',
        'extensions': 'func'
    },
    {
        'language': 'G-Code',
        'extensions': 'gcode'
    },
    {
        'language': 'Gams',
        'extensions': 'gams'
    },
    {
        'language': 'GAUSS',
        'extensions': 'gauss'
    },
    {
        'language': 'GDScript',
        'extensions': 'godot'
    },
    {
        'language': 'Gherkin',
        'extensions': 'gherkin'
    },
    {
        'language': 'Glimmer and EmberJS',
        'extensions': 'hbs'
    },
    {
        'language': 'GN for Ninja',
        'extensions': 'gn'
    },
    {
        'language': 'Go',
        'extensions': 'go'
    },
    {
        'language': 'Grammatical Framework',
        'extensions': 'gf'
    },
    {
        'language': 'Golo',
        'extensions': 'golo'
    },
    {
        'language': 'Gradle',
        'extensions': 'gradle'
    },
    {
        'language': 'GraphQL',
        'extensions': 'graphql'
    },
    {
        'language': 'Groovy',
        'extensions': 'groovy'
    },
    {
        'language': 'GSQL',
        'extensions': 'gsql'
    },
    {
        'language': 'HTML, XML',
        'extensions': 'xml'
    },
    {
        'language': 'HTTP',
        'extensions': 'http'
    },
    {
        'language': 'Haml',
        'extensions': 'haml'
    },
    {
        'language': 'Handlebars',
        'extensions': 'handlebars'
    },
    {
        'language': 'Haskell',
        'extensions': 'haskell'
    },
    {
        'language': 'Haxe',
        'extensions': 'haxe'
    },
    {
        'language': 'High-level shader language',
        'extensions': 'hlsl'
    },
    {
        'language': 'Hy',
        'extensions': 'hy'
    },
    {
        'language': 'Ini, TOML',
        'extensions': 'ini'
    },
    {
        'language': 'Inform7',
        'extensions': 'inform7'
    },
    {
        'language': 'IRPF90',
        'extensions': 'irpf90'
    },
    {
        'language': 'JSON',
        'extensions': 'json'
    },
    {
        'language': 'Java',
        'extensions': 'java'
    },
    {
        'language': 'JavaScript',
        'extensions': 'javascript'
    },
    {
        'language': 'Jolie',
        'extensions': 'jolie'
    },
    {
        'language': 'Julia',
        'extensions': 'julia'
    },
    {
        'language': 'Kotlin',
        'extensions': 'kotlin'
    },
    {
        'language': 'LaTeX',
        'extensions': 'tex'
    },
    {
        'language': 'Leaf',
        'extensions': 'leaf'
    },
    {
        'language': 'Lean',
        'extensions': 'lean'
    },
    {
        'language': 'Lasso',
        'extensions': 'lasso'
    },
    {
        'language': 'Less',
        'extensions': 'less'
    },
    {
        'language': 'LDIF',
        'extensions': 'ldif'
    },
    {
        'language': 'Lisp',
        'extensions': 'lisp'
    },
    {
        'language': 'LiveCode Server',
        'extensions': 'livecodeserver'
    },
    {
        'language': 'LiveScript',
        'extensions': 'livescript'
    },
    {
        'language': 'LookML',
        'extensions': 'lookml'
    },
    {
        'language': 'Lua',
        'extensions': 'lua'
    },
    {
        'language': 'Macaulay2',
        'extensions': 'macaulay2'
    },
    {
        'language': 'Makefile',
        'extensions': 'makefile'
    },
    {
        'language': 'Markdown',
        'extensions': 'markdown'
    },
    {
        'language': 'Mathematica',
        'extensions': 'mathematica'
    },
    {
        'language': 'Matlab',
        'extensions': 'matlab'
    },
    {
        'language': 'Maxima',
        'extensions': 'maxima'
    },
    {
        'language': 'Maya Embedded Language',
        'extensions': 'mel'
    },
    {
        'language': 'Mercury',
        'extensions': 'mercury'
    },
    {
        'language': 'mIRC Scripting Language',
        'extensions': 'mirc'
    },
    {
        'language': 'Mizar',
        'extensions': 'mizar'
    },
    {
        'language': 'MKB',
        'extensions': 'mkb'
    },
    {
        'language': 'MLIR',
        'extensions': 'mlir'
    },
    {
        'language': 'Mojolicious',
        'extensions': 'mojolicious'
    },
    {
        'language': 'Monkey',
        'extensions': 'monkey'
    },
    {
        'language': 'Moonscript',
        'extensions': 'moonscript'
    },
    {
        'language': 'N1QL',
        'extensions': 'n1ql'
    },
    {
        'language': 'NSIS',
        'extensions': 'nsis'
    },
    {
        'language': 'Never',
        'extensions': 'never'
    },
    {
        'language': 'Nginx',
        'extensions': 'nginx'
    },
    {
        'language': 'Nim',
        'extensions': 'nim'
    },
    {
        'language': 'Nix',
        'extensions': 'nix'
    },
    {
        'language': 'Oak',
        'extensions': 'oak'
    },
    {
        'language': 'Object Constraint Language',
        'extensions': 'ocl'
    },
    {
        'language': 'OCaml',
        'extensions': 'ocaml'
    },
    {
        'language': 'Objective C',
        'extensions': 'objectivec'
    },
    {
        'language': 'OpenGL Shading Language',
        'extensions': 'glsl'
    },
    {
        'language': 'OpenSCAD',
        'extensions': 'openscad'
    },
    {
        'language': 'Oracle Rules Language',
        'extensions': 'ruleslanguage'
    },
    {
        'language': 'Oxygene',
        'extensions': 'oxygene'
    },
    {
        'language': 'PF',
        'extensions': 'pf'
    },
    {
        'language': 'PHP',
        'extensions': 'php'
    },
    {
        'language': 'Papyrus',
        'extensions': 'papyrus'
    },
    {
        'language': 'Parser3',
        'extensions': 'parser3'
    },
    {
        'language': 'Perl',
        'extensions': 'perl'
    },
    {
        'language': 'Pine Script',
        'extensions': 'pine'
    },
    {
        'language': 'Plaintext',
        'extensions': 'plaintext'
    },
    {
        'language': 'Pony',
        'extensions': 'pony'
    },
    {
        'language': 'PostgreSQL & PL/pgSQL',
        'extensions': 'pgsql'
    },
    {
        'language': 'PowerShell',
        'extensions': 'powershell'
    },
    {
        'language': 'Processing',
        'extensions': 'processing'
    },
    {
        'language': 'Prolog',
        'extensions': 'prolog'
    },
    {
        'language': 'Properties',
        'extensions': 'properties'
    },
    {
        'language': 'Protocol Buffers',
        'extensions': 'protobuf'
    },
    {
        'language': 'Puppet',
        'extensions': 'puppet'
    },
    {
        'language': 'Python',
        'extensions': 'python'
    },
    {
        'language': 'Python profiler results',
        'extensions': 'profile'
    },
    {
        'language': 'Python REPL',
        'extensions': 'python-repl'
    },
    {
        'language': 'Q#',
        'extensions': 'qsharp'
    },
    {
        'language': 'Q',
        'extensions': 'k'
    },
    {
        'language': 'QML',
        'extensions': 'qml'
    },
    {
        'language': 'R',
        'extensions': 'r'
    },
    {
        'language': 'Razor CSHTML',
        'extensions': 'cshtml'
    },
    {
        'language': 'ReasonML',
        'extensions': 'reasonml'
    },
    {
        'language': 'Rebol & Red',
        'extensions': 'redbol'
    },
    {
        'language': 'RenderMan RIB',
        'extensions': 'rib'
    },
    {
        'language': 'RenderMan RSL',
        'extensions': 'rsl'
    },
    {
        'language': 'RiScript',
        'extensions': 'risc'
    },
    {
        'language': 'Roboconf',
        'extensions': 'graph'
    },
    {
        'language': 'Robot Framework',
        'extensions': 'robot'
    },
    {
        'language': 'RPM spec files',
        'extensions': 'rpm-specfile'
    },
    {
        'language': 'Ruby',
        'extensions': 'ruby'
    },
    {
        'language': 'Rust',
        'extensions': 'rust'
    },
    {
        'language': 'SAS',
        'extensions': 'SAS'
    },
    {
        'language': 'SCSS',
        'extensions': 'scss'
    },
    {
        'language': 'SQL',
        'extensions': 'sql'
    },
    {
        'language': 'STEP Part 21',
        'extensions': 'p21'
    },
    {
        'language': 'Scala',
        'extensions': 'scala'
    },
    {
        'language': 'Scheme',
        'extensions': 'scheme'
    },
    {
        'language': 'Scilab',
        'extensions': 'scilab'
    },
    {
        'language': 'Shape Expressions',
        'extensions': 'shexc'
    },
    {
        'language': 'Shell',
        'extensions': 'shell'
    },
    {
        'language': 'Smali',
        'extensions': 'smali'
    },
    {
        'language': 'Smalltalk',
        'extensions': 'smalltalk'
    },
    {
        'language': 'SML',
        'extensions': 'sml'
    },
    {
        'language': 'Solidity',
        'extensions': 'solidity'
    },
    {
        'language': 'Splunk SPL',
        'extensions': 'spl'
    },
    {
        'language': 'Stan',
        'extensions': 'stan'
    },
    {
        'language': 'Stata',
        'extensions': 'stata'
    },
    {
        'language': 'Structured Text',
        'extensions': 'iecst'
    },
    {
        'language': 'Stylus',
        'extensions': 'stylus'
    },
    {
        'language': 'SubUnit',
        'extensions': 'subunit'
    },
    {
        'language': 'Supercollider',
        'extensions': 'supercollider'
    },
    {
        'language': 'Svelte',
        'extensions': 'svelte'
    },
    {
        'language': 'Swift',
        'extensions': 'swift'
    },
    {
        'language': 'Tcl',
        'extensions': 'tcl'
    },
    {
        'language': 'Terraform (HCL)',
        'extensions': 'terraform'
    },
    {
        'language': 'Test Anything Protocol',
        'extensions': 'tap'
    },
    {
        'language': 'Thrift',
        'extensions': 'thrift'
    },
    {
        'language': 'Toit',
        'extensions': 'toit'
    },
    {
        'language': 'TP',
        'extensions': 'tp'
    },
    {
        'language': 'Transact-SQL',
        'extensions': 'tsql'
    },
    {
        'language': 'Twig',
        'extensions': 'twig'
    },
    {
        'language': 'TypeScript',
        'extensions': 'typescript'
    },
    {
        'language': 'Unicorn Rails log',
        'extensions': 'unicorn-rails-log'
    },
    {
        'language': 'VB.Net',
        'extensions': 'vbnet'
    },
    {
        'language': 'VBA',
        'extensions': 'vba'
    },
    {
        'language': 'VBScript',
        'extensions': 'vbscript'
    },
    {
        'language': 'VHDL',
        'extensions': 'vhdl'
    },
    {
        'language': 'Vala',
        'extensions': 'vala'
    },
    {
        'language': 'Verilog',
        'extensions': 'verilog'
    },
    {
        'language': 'Vim Script',
        'extensions': 'vim'
    },
    {
        'language': 'X#',
        'extensions': 'xsharp'
    },
    {
        'language': 'X++',
        'extensions': 'axapta'
    },
    {
        'language': 'x86 Assembly',
        'extensions': 'x86asm'
    },
    {
        'language': 'XL',
        'extensions': 'xl'
    },
    {
        'language': 'XQuery',
        'extensions': 'xquery'
    },
    {
        'language': 'YAML',
        'extensions': 'yml'
    },
    {
        'language': 'ZenScript',
        'extensions': 'zenscript'
    },
    {
        'language': 'Zephir',
        'extensions': 'zephir'
    },
    {
        'language': 'SML',
        'extensions': 'ml'
    },
    {
        'language': 'OCaml',
        'extensions': 'ml'
    },
    {
        'language': 'Lasso',
        'extensions': 'ls'
    },
    {
        'language': 'LiveScript',
        'extensions': 'ls'
    }
];

export default languages;