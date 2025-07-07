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
        },
        {
            "question": "21. ¿Qué capa intermedia se encarga de ocultar diferencias de hardware y sistemas operativos en un sistema distribuido?",
            "options": {
                "a": "Sistema operativo",
                "b": "Middleware",
                "c": "Proxy",
                "d": "Microservicio"
            },
            "answer": "b"
        },
        {
            "question": "22. ¿Cuál es un objetivo clave en el diseño de sistemas distribuidos?",
            "options": {
                "a": "Minimizar el uso de red",
                "b": "Maximizar la dependencia entre componentes",
                "c": "Compartir recursos",
                "d": "Evitar la concurrencia"
            },
            "answer": "c"
        },
        {
            "question": "23. Tipo de transparencia que permite ocultar la replicación de datos al usuario:",
            "options": {
                "a": "Transparencia de acceso",
                "b": "Transparencia de replicación",
                "c": "Transparencia de ubicación",
                "d": "Transparencia de concurrencia"
            },
            "answer": "b"
        },
        {
            "question": "24. En el modelo de Lamport, ¿qué significa que 'a → b'?",
            "options": {
                "a": "a ocurre después de b",
                "b": "a y b ocurren simultáneamente",
                "c": "a ocurre antes que b",
                "d": "a depende de b"
            },
            "answer": "c"
        },
        {
            "question": "25. ¿Cuál de los siguientes algoritmos distribuidos utiliza marcas de tiempo lógicas para decidir el acceso a recursos?",
            "options": {
                "a": "Centralizado",
                "b": "Token anillo",
                "c": "Distribuido de Ricart-Agrawala",
                "d": "Votación"
            },
            "answer": "c"
        },
        {
            "question": "26. ¿Qué algoritmo de sincronización de relojes promedia los tiempos de varias máquinas?",
            "options": {
                "a": "NTP",
                "b": "Berkeley",
                "c": "Lamport",
                "d": "Cristian"
            },
            "answer": "b"
        },
        {
            "question": "27. ¿Qué estilo arquitectónico se basa en el intercambio de mensajes asincrónicos entre procesos?",
            "options": {
                "a": "Cliente-servidor",
                "b": "Capas",
                "c": "Basado en eventos",
                "d": "Orientado a objetos"
            },
            "answer": "c"
        },
        {
            "question": "28. ¿Qué tipo de acoplamiento exige que los procesos estén activos al mismo tiempo y se conozcan mutuamente?",
            "options": {
                "a": "Temporalmente desacoplado",
                "b": "Coordinación directa",
                "c": "Acoplamiento por evento",
                "d": "Espacio de datos compartido"
            },
            "answer": "b"
        },
        {
            "question": "29. ¿Qué componente en una arquitectura basada en objetos se encarga de invocar métodos en nombre del cliente?",
            "options": {
                "a": "Skeleton",
                "b": "Proxy",
                "c": "Middleware",
                "d": "Monitor"
            },
            "answer": "b"
        },
        {
            "question": "30. ¿Cuál de las siguientes NO es una característica de transparencia en sistemas distribuidos?",
            "options": {
                "a": "Migración",
                "b": "Recuperación",
                "c": "Acceso",
                "d": "Coordinación"
            },
            "answer": "d"
        },
        {
            "question": "31. ¿Qué tipo de arquitectura organiza los servicios en componentes pequeños, autónomos e independientes?",
            "options": {
                "a": "Capas",
                "b": "Microservicios",
                "c": "SOA",
                "d": "Cliente-servidor"
            },
            "answer": "b"
        },
        {
            "question": "32. ¿Qué protocolo se utiliza para sincronizar relojes entre nodos en una red?",
            "options": {
                "a": "RPC",
                "b": "HTTPS",
                "c": "NTP",
                "d": "SMTP"
            },
            "answer": "c"
        },
        {
            "question": "33. ¿Qué capa del modelo OSI se encarga de la codificación y representación de datos?",
            "options": {
                "a": "Capa de sesión",
                "b": "Capa de presentación",
                "c": "Capa de transporte",
                "d": "Capa física"
            },
            "answer": "b"
        },
        {
            "question": "34. ¿Qué tipo de fallo implica que un sistema sigue funcionando pero produce resultados erróneos sin notificación?",
            "options": {
                "a": "Silencioso",
                "b": "Bizantino",
                "c": "Detenido",
                "d": "De red"
            },
            "answer": "a"
        },
        {
            "question": "35. ¿Cuál de las siguientes arquitecturas permite llamadas ascendentes de una capa inferior a una superior?",
            "options": {
                "a": "Arquitectura pura en capas",
                "b": "Arquitectura mixta",
                "c": "Arquitectura con upcalls",
                "d": "Arquitectura lineal"
            },
            "answer": "c"
        },
        {
            "question": "36. ¿Cuál es el mecanismo común de comunicación en arquitecturas orientadas a eventos?",
            "options": {
                "a": "Llamadas a procedimientos",
                "b": "Publicación-suscripción",
                "c": "Pasaje de parámetros",
                "d": "Pipes"
            },
            "answer": "b"
        },
        {
            "question": "37. ¿Qué se requiere en una arquitectura abierta?",
            "options": {
                "a": "Fuentes cerradas",
                "b": "Protocolos propietarios",
                "c": "Estándares públicos de interfaces",
                "d": "Lenguaje ensamblador"
            },
            "answer": "c"
        },
        {
            "question": "38. ¿Qué significa que un middleware sea 'como un sistema operativo' para un sistema distribuido?",
            "options": {
                "a": "Maneja solo los procesos",
                "b": "Administra recursos y comunicación entre componentes",
                "c": "Controla la interfaz gráfica",
                "d": "Sustituye al kernel"
            },
            "answer": "b"
        },
        {
            "question": "39. ¿Cuál es la causa principal de fallos parciales en sistemas distribuidos?",
            "options": {
                "a": "Software obsoleto",
                "b": "Fallo en un nodo individual",
                "c": "Latencia de red",
                "d": "Usuarios múltiples"
            },
            "answer": "b"
        },
        {
            "question": "40. ¿Qué arquitectura usa un Bus de Servicios Empresarial (ESB)?",
            "options": {
                "a": "Microservicios",
                "b": "Cliente-servidor",
                "c": "SOA",
                "d": "Peer-to-peer"
            },
            "answer": "c"
        },
        {
            "question": "41. ¿Qué técnica permite ejecutar múltiples máquinas virtuales sobre un mismo hardware físico?",
            "options": {
                "a": "Fragmentación",
                "b": "Balanceo de carga",
                "c": "Virtualización",
                "d": "Despliegue horizontal"
            },
            "answer": "c"
        },
        {
            "question": "42. ¿Cuál de los siguientes es un tipo de modelo de servicio en la computación en la nube?",
            "options": {
                "a": "DaaD",
                "b": "SaaS",
                "c": "AaaI",
                "d": "NaaC"
            },
            "answer": "b"
        },
        {
            "question": "43. ¿Qué modelo de despliegue en la nube es operado por múltiples organizaciones?",
            "options": {
                "a": "Privado",
                "b": "Público",
                "c": "Híbrido",
                "d": "Comunitario"
            },
            "answer": "d"
        },
        {
            "question": "44. ¿Cuál es una ventaja directa del uso de contenedores?",
            "options": {
                "a": "Mayor necesidad de virtualización",
                "b": "Mayor uso de memoria",
                "c": "Portabilidad de aplicaciones",
                "d": "Reducción de procesamiento paralelo"
            },
            "answer": "c"
        },
        {
            "question": "45. En la arquitectura de replicación pasiva, ¿qué componente es responsable de ejecutar las operaciones del cliente?",
            "options": {
                "a": "El middleware",
                "b": "El RM secundario",
                "c": "El RM primario",
                "d": "El monitor de carga"
            },
            "answer": "c"
        },
        {
            "question": "46. ¿Qué tipo de replicación permite a los gestores de réplica procesar solicitudes de forma independiente?",
            "options": {
                "a": "Modelo activo",
                "b": "Modelo híbrido",
                "c": "Modelo pasivo",
                "d": "Modelo FIFO"
            },
            "answer": "a"
        },
        {
            "question": "47. ¿Qué característica permite que múltiples copias físicas parezcan una sola a los clientes?",
            "options": {
                "a": "Transparencia de concurrencia",
                "b": "Transparencia de replicación",
                "c": "Transparencia de acceso",
                "d": "Transparencia de localización"
            },
            "answer": "b"
        },
        {
            "question": "48. ¿Cuál de los siguientes no es un beneficio directo de la replicación?",
            "options": {
                "a": "Alta disponibilidad",
                "b": "Reducción de seguridad",
                "c": "Tolerancia a fallos",
                "d": "Mejora de rendimiento"
            },
            "answer": "b"
        },
        {
            "question": "49. ¿Qué dimensión de escalabilidad se refiere a operar el sistema eficientemente entre múltiples organizaciones?",
            "options": {
                "a": "Escalabilidad geográfica",
                "b": "Escalabilidad funcional",
                "c": "Escalabilidad administrativa",
                "d": "Escalabilidad lógica"
            },
            "answer": "c"
        },
        {
            "question": "50. ¿Qué técnica de escalado permite ocultar latencias de comunicación?",
            "options": {
                "a": "Balanceo activo",
                "b": "Replicación vertical",
                "c": "Ocultamiento de latencias",
                "d": "Uso de contenedores"
            },
            "answer": "c"
        },
        {
            "question": "51. ¿Cuál de los siguientes es una suposición falsa común sobre redes en sistemas distribuidos?",
            "options": {
                "a": "La latencia es alta",
                "b": "El ancho de banda es limitado",
                "c": "El costo de transporte es cero",
                "d": "Hay múltiples administradores"
            },
            "answer": "c"
        },
        {
            "question": "52. ¿Qué arquitectura se basa en recursos identificables con URIs?",
            "options": {
                "a": "SOA",
                "b": "Arquitectura REST",
                "c": "Arquitectura orientada a recursos",
                "d": "Cliente-servidor"
            },
            "answer": "c"
        },
        {
            "question": "53. En el modelo publicación-suscripción, ¿quién recibe una notificación?",
            "options": {
                "a": "Todos los procesos del sistema",
                "b": "Solo los procesos que la solicitan directamente",
                "c": "Los procesos que se hayan suscrito a ella",
                "d": "El servidor principal"
            },
            "answer": "c"
        },
        {
            "question": "54. ¿Cuál es una ventaja clave de los microservicios?",
            "options": {
                "a": "Complejidad estructural",
                "b": "Dependencia fuerte entre servicios",
                "c": "Modularidad y escalabilidad",
                "d": "Necesidad de un único servidor"
            },
            "answer": "c"
        },
        {
            "question": "55. ¿Qué permite la arquitectura basada en eventos?",
            "options": {
                "a": "Alto acoplamiento entre procesos",
                "b": "Separación entre procesamiento y coordinación",
                "c": "Uso exclusivo de protocolos síncronos",
                "d": "Eliminación de colas de mensajes"
            },
            "answer": "b"
        },
        {
            "question": "56. ¿Qué tipo de coordinación implica que los procesos no se conozcan explícitamente?",
            "options": {
                "a": "Coordinación directa",
                "b": "Coordinación de buzón",
                "c": "Coordinación sincrónica",
                "d": "Coordinación estática"
            },
            "answer": "b"
        },
        {
            "question": "57. ¿Cuál de los siguientes no es un método HTTP usado en REST?",
            "options": {
                "a": "GET",
                "b": "SET",
                "c": "POST",
                "d": "DELETE"
            },
            "answer": "b"
        },
        {
            "question": "58. ¿Qué tipo de cloud es gestionado por un proveedor externo y accesible a cualquier usuario?",
            "options": {
                "a": "Privado",
                "b": "Híbrido",
                "c": "Público",
                "d": "Comunitario"
            },
            "answer": "c"
        },
        {
            "question": "59. ¿Qué tipo de infraestructura permite aislar aplicaciones con menos sobrecarga que las máquinas virtuales?",
            "options": {
                "a": "Cloud bare-metal",
                "b": "Contenedores",
                "c": "VPNs",
                "d": "Microkernel"
            },
            "answer": "b"
        },
        {
            "question": "60. ¿Qué aspecto permite que los procesos puedan ser trasladados sin impacto al usuario final?",
            "options": {
                "a": "Transparencia de concurrencia",
                "b": "Transparencia de migración",
                "c": "Transparencia de acceso",
                "d": "Transparencia de replicación"
            },
            "answer": "b"
        }
    ]

    score = 0
    total_questions = len(questions)

    random.shuffle(questions)

    print("--- ¡Bienvenido al Examen 2 - Sistemas Distribuidos y Nube (Versión Completa)! ---")
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