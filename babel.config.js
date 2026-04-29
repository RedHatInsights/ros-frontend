module.exports = {
    presets: [
        '@babel/env',
        '@babel/react'
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-object-rest-spread',
        '@babel/plugin-transform-class-properties',
        'lodash',
        [
            'transform-imports',
            {
                '@patternfly/react-icons': {
                    transform: (importName) =>
                        `@patternfly/react-icons/dist/js/icons/${importName
                        .split(/(?=[A-Z])/)
                        .join('-')
                        .toLowerCase()}`,
                    preventFullImport: true
                }
            },
            'react-icons'
        ]
    ]
};
