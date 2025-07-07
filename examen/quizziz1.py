import random

def run_quiz():
    questions = [
        {
            "question": "1. Tipo de comunicación que el remitente continúa inmediatamente después que ha pasado su mensaje para la transmisión:",
            "options": {
                "a": "Asíncrona",
                "b": "Síncrona", 
                "c": "Bloqueante",
                "d": "No bloqueante"
            },
            "answer": "a"
        },
        {
            "question": "2. Tipo de comunicación donde el middleware de comunicación almacena el mensaje que le ha sido entregado para transmitir el tiempo que le tome al destinatario:",
            "options": {
                "a": "Asíncrona",
                "b": "Síncrona",
                "c": "Persistente", 
                "d": "Transitoria"
            },
            "answer": "c"
        },
        {
            "question": "3. Gestión de múltiples procesos en un multiprocesador:",
            "options": {
                "a": "Multitarea",
                "b": "Multiprocesamiento",
                "c": "Concurrencia",
                "d": "Paralelismo"
            },
            "answer": "b"
        },
        {
            "question": "4. Situación en la cual dos o más procesos son incapaces de actuar porque cada uno está esperando que los otros haga algo:",
            "options": {
                "a": "Deadlock",
                "b": "Starvation",
                "c": "Race condition",
                "d": "Sincronización"
            },
            "answer": "a"
        },
        {
            "question": "5. Situación en la cual múltiples hilos o procesos leen y escriben un dato compartido y el resultado final depende de la coordinación relativa a sus ejecuciones:",
            "options": {
                "a": "Deadlock",
                "b": "Race condition",
                "c": "Starvation",
                "d": "Multiprocesamiento"
            },
            "answer": "b"
        },
        {
            "question": "6. Quienes concibieron el algoritmo de elección del grandullón (Bully):",
            "options": {
                "a": "Lamport",
                "b": "García-Molina",
                "c": "Tanenbaum",
                "d": "Dijkstra"
            },
            "answer": "b"
        },
        {
            "question": "7. Grupo de comunicación donde los no-miembros pueden enviar al grupo:",
            "options": {
                "a": "Cerrado",
                "b": "Abierto",
                "c": "Privado",
                "d": "Público"
            },
            "answer": "b"
        },
        {
            "question": "8. Ordenación donde si multicast(g,m) → multicast(g,m'), donde → indica la relación sucedió antes incluida solamente entre los miembros de g, entonces cualquier proceso correcto que entregue m' habrá entregado previamente a m:",
            "options": {
                "a": "FIFO",
                "b": "Causal",
                "c": "Total",
                "d": "Atómica"
            },
            "answer": "b"
        },
        {
            "question": "9. Fallo donde no se detecta, el sistema sigue funcionando pero produce resultados incorrectos:",
            "options": {
                "a": "Fail-stop",
                "b": "Fail-silent",
                "c": "Silencioso",
                "d": "Bizantino"
            },
            "answer": "c"
        },
        {
            "question": "10. Replicación donde los RM son máquinas de estados que desempeñan papeles equivalentes y se organizan como un grupo:",
            "options": {
                "a": "Activa",
                "b": "Pasiva",
                "c": "Modelo activo",
                "d": "Modelo pasivo"
            },
            "answer": "c"
        },
        {
            "question": "11. Colección de elementos informáticos autónomos que se presenta a sus usuarios como un único sistema coherente:",
            "options": {
                "a": "Red distribuida",
                "b": "Sistema distribuido",
                "c": "Cluster",
                "d": "Grid computing"
            },
            "answer": "b"
        },
        {
            "question": "12. Uno en el que la falla de una computadora que ni siquiera sabías que existía puede hacer que tu propio computador quede inutilizable (descripción dada por):",
            "options": {
                "a": "Tanenbaum",
                "b": "Leslie Lamport",
                "c": "García-Molina",
                "d": "Dijkstra"
            },
            "answer": "b"
        },
        {
            "question": "13. Capa separada de software que se coloca lógicamente sobre los sistemas operativos de las computadoras que forman parte del sistema distribuido:",
            "options": {
                "a": "Sistema operativo",
                "b": "Middleware",
                "c": "Protocolo",
                "d": "API"
            },
            "answer": "b"
        },
        {
            "question": "14. En cierto sentido, para un sistema distribuido el middleware es lo que para una computadora es:",
            "options": {
                "a": "El hardware",
                "b": "El sistema operativo",
                "c": "La aplicación",
                "d": "La red"
            },
            "answer": "b"
        },
        {
            "question": "15. El hecho de ocultar que procesos y recursos están distribuidos físicamente en las computadoras posiblemente separadas a grandes distancias:",
            "options": {
                "a": "Abstracción",
                "b": "Transparencia",
                "c": "Virtualización",
                "d": "Encapsulación"
            },
            "answer": "b"
        },
        {
            "question": "16. Define una familia de sistemas en términos de patrones estructurales, de control y de comunicación:",
            "options": {
                "a": "Arquitectura",
                "b": "Estilo arquitectónico",
                "c": "Patrón de diseño",
                "d": "Framework"
            },
            "answer": "b"
        },
        {
            "question": "17. Describe las reglas que seguirán las partes para intercambiar información:",
            "options": {
                "a": "Estilo arquitectónico",
                "b": "Protocolo",
                "c": "API",
                "d": "Interface"
            },
            "answer": "b"
        },
        {
            "question": "18. Significa que los procesos que se comunican tendrán que estar en funcionamiento:",
            "options": {
                "a": "Sincronización",
                "b": "Acoplamiento temporal",
                "c": "Persistencia",
                "d": "Consistencia"
            },
            "answer": "b"
        },
        {
            "question": "19. Proceso que actúa como cliente y servidor al mismo tiempo:",
            "options": {
                "a": "Proxy",
                "b": "Sirviente",
                "c": "Peer",
                "d": "Broker"
            },
            "answer": "b"
        },
        {
            "question": "20. Arquitecturas de sistemas modernas que admiten la distribución horizontal:",
            "options": {
                "a": "Cliente-servidor",
                "b": "Peer-to-peer",
                "c": "Multicapa",
                "d": "SOA"
            },
            "answer": "b"
        }
    ]

    score = 0
    total_questions = len(questions)

    random.shuffle(questions)

    print("--- ¡Bienvenido al Examen 2 - Sistemas Distribuidos! ---")
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