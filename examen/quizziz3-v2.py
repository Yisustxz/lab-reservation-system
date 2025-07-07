import random

def run_quiz():
    questions = [
        {
            "question": "1. ¿Qué característica permite a los usuarios escalar los servicios en la nube según sus necesidades?",
            "options": {
                "a": "Aprovisionamiento automático",
                "b": "Flexibilidad",
                "c": "Automatización",
                "d": "Integración continua"
            },
            "answer": "b"
        },
        {
            "question": "2. ¿Qué opción permite a las organizaciones determinar el nivel de control sobre los servicios de nube?",
            "options": {
                "a": "Virtualización",
                "b": "Modelos de suscripción",
                "c": "Modelos de servicio como SaaS, PaaS e IaaS",
                "d": "Protocolos de red"
            },
            "answer": "c"
        },
        {
            "question": "3. ¿Qué herramienta permite crear \"libros de tácticas\" en YAML para definir configuraciones deseadas?",
            "options": {
                "a": "Docker",
                "b": "Terraform",
                "c": "Jenkins",
                "d": "Ansible"
            },
            "answer": "d"
        },
        {
            "question": "4. ¿Cuál es el lenguaje usado por Terraform para definir infraestructura como código?",
            "options": {
                "a": "JSON",
                "b": "YAML",
                "c": "HCL",
                "d": "XML"
            },
            "answer": "c"
        },
        {
            "question": "5. ¿Qué patrón permite dividir operaciones de lectura y escritura en diferentes interfaces?",
            "options": {
                "a": "Cola de prioridad",
                "b": "CQRS",
                "c": "Retry",
                "d": "Proxy"
            },
            "answer": "b"
        },
        {
            "question": "6. ¿Qué patrón mejora la tolerancia a errores mediante reintentos ante fallas transitorias?",
            "options": {
                "a": "Interceptor",
                "b": "Retry",
                "c": "Circuit Breaker",
                "d": "Auto Scaling"
            },
            "answer": "b"
        },
        {
            "question": "7. ¿Cuál de estos no es un principio básico de DevOps?",
            "options": {
                "a": "Agilidad",
                "b": "Comentarios",
                "c": "Testing automatizado",
                "d": "Automatización"
            },
            "answer": "c"
        },
        {
            "question": "8. ¿Cuál es la función del patrón de \"interruptor de circuito\"?",
            "options": {
                "a": "Acelerar la entrega continua",
                "b": "Evitar sobrecarga de solicitudes cuando un servicio falla",
                "c": "Balancear tráfico de red",
                "d": "Controlar versiones"
            },
            "answer": "b"
        },
        {
            "question": "9. ¿Qué elemento forma parte fundamental de la canalización de integración continua?",
            "options": {
                "a": "Backup automático",
                "b": "Control de versiones",
                "c": "Limitación de carga",
                "d": "Renderizado local"
            },
            "answer": "b"
        },
        {
            "question": "10. ¿Qué práctica DevOps ayuda a empaquetar aplicaciones listas para implementarse?",
            "options": {
                "a": "Administración de configuración",
                "b": "Implementación continua",
                "c": "Entrega continua",
                "d": "Orquestación"
            },
            "answer": "c"
        },
        {
            "question": "11. ¿Qué tipo de infraestructura se reemplaza completamente en vez de modificarse?",
            "options": {
                "a": "Mutable",
                "b": "Privada",
                "c": "Pública",
                "d": "Inmutable"
            },
            "answer": "d"
        },
        {
            "question": "12. ¿Qué componente DevOps ejecuta compilación y pruebas automáticamente al recibir nuevo código?",
            "options": {
                "a": "Integración continua",
                "b": "Pipeline",
                "c": "Implementación continua",
                "d": "Controlador de versiones"
            },
            "answer": "a"
        },
        {
            "question": "13. ¿Cuál es una función de los patrones de mensajería como \"cola de prioridad\"?",
            "options": {
                "a": "Ejecutar código en paralelo",
                "b": "Conectar servicios directamente",
                "c": "Gestionar SLA diferenciados según prioridad",
                "d": "Monitorear logs en tiempo real"
            },
            "answer": "c"
        },
        {
            "question": "14. ¿Cuál es una ventaja directa del autoservicio bajo demanda en la nube?",
            "options": {
                "a": "Mayor seguridad en redes privadas",
                "b": "Acceso global a recursos mediante API",
                "c": "Mejores precios para grandes empresas",
                "d": "Control manual sobre servidores físicos"
            },
            "answer": "b"
        },
        {
            "question": "15. ¿Cuál es el objetivo de la administración de configuración en DevOps?",
            "options": {
                "a": "Reducir el tiempo de pruebas",
                "b": "Controlar versiones del código fuente",
                "c": "Garantizar que cada entorno tenga su propia configuración",
                "d": "Ejecutar aplicaciones con múltiples usuarios simultáneos"
            },
            "answer": "c"
        }
    ]

    score = 0
    total_questions = len(questions)

    random.shuffle(questions)

    print("--- ¡Bienvenido al Examen 3 - Computación en la Nube (CEN 12, 13 y 14)! ---")
    print(f"Total de preguntas: {total_questions}\n")

    for i, q in enumerate(questions):
        print(f"Pregunta {i + 1}: {q['question']}")
        for option_key, option_text in q['options'].items():
            print(f"  {option_key}) {option_text}")

        user_answer = input("Tu respuesta (ingresa la letra de la opción): ").lower().strip()

        if user_answer == q['answer']:
            print("¡Correcto!\n")
            score += 1
        else:
            print(f"Incorrecto. La respuesta correcta era: {q['answer'].upper()}) {q['options'][q['answer']]}\n")

    print("--- Fin del Examen ---")
    print(f"Tu puntuación final es: {score} de {total_questions}")
    percentage = (score / total_questions) * 100
    print(f"Porcentaje: {percentage:.2f}%")

if __name__ == "__main__":
    run_quiz()