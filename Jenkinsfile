pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/lucas-yn/teste-api-ebac.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
                powershell 'npm install'
            }
        }
               
        stage('Executar testes') {
            steps {
                powershell '''set NO_COLOR=1
                npm run cy:run'''
            }
        }
    }
}
