module.exports = {
    apps: [
      {
        name: 'bun-app',
        script: 'bun',
        args: 'src/app.ts',  
        interpreter: '/bin/bash', 
      }
    ]
  };
  