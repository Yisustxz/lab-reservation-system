import random

def run_quiz():
    questions = [
        {
            "question": "1. ¿Cuál es la principal ventaja de usar microservicios en comparación con una arquitectura monolítica?",
            "options": {
                "a": "Mayor complejidad de desarrollo",
                "b": "Escalabilidad independiente de cada servicio",
                "c": "Menor uso de recursos de red",
                "d": "Facilidad de debugging"
            },
            "answer": "b"
        },
        {
            "question": "2. ¿Qué protocolo es más comúnmente usado para la comunicación entre microservicios?",
            "options": {
                "a": "FTP",
                "b": "SMTP",
                "c": "HTTP/REST",
                "d": "SNMP"
            },
            "answer": "c"
        },
        {
            "question": "3. ¿Cuál es el propósito principal de un API Gateway en una arquitectura de microservicios?",
            "options": {
                "a": "Almacenar datos de sesión",
                "b": "Centralizar la autenticación y enrutamiento",
                "c": "Ejecutar lógica de negocio",
                "d": "Gestionar la base de datos"
            },
            "answer": "b"
        },
        {
            "question": "4. ¿Qué patrón de diseño es útil para manejar fallos en comunicación entre servicios?",
            "options": {
                "a": "Singleton",
                "b": "Observer",
                "c": "Circuit Breaker",
                "d": "Factory"
            },
            "answer": "c"
        },
        {
            "question": "5. ¿Cuál es la diferencia principal entre escalabilidad horizontal y vertical?",
            "options": {
                "a": "Horizontal añade más potencia, vertical añade más máquinas",
                "b": "Horizontal añade más máquinas, vertical añade más potencia",
                "c": "No hay diferencia significativa",
                "d": "Ambas son lo mismo"
            },
            "answer": "b"
        },
        {
            "question": "6. ¿Qué es Docker en el contexto de contenedores?",
            "options": {
                "a": "Un sistema operativo",
                "b": "Una plataforma de virtualización de aplicaciones",
                "c": "Un lenguaje de programación",
                "d": "Un protocolo de red"
            },
            "answer": "b"
        },
        {
            "question": "7. ¿Cuál es la ventaja principal de usar contenedores sobre máquinas virtuales?",
            "options": {
                "a": "Mayor aislamiento de seguridad",
                "b": "Menor consumo de recursos",
                "c": "Mejor rendimiento gráfico",
                "d": "Mayor compatibilidad con hardware"
            },
            "answer": "b"
        },
        {
            "question": "8. ¿Qué es Kubernetes?",
            "options": {
                "a": "Un sistema de base de datos",
                "b": "Un orquestador de contenedores",
                "c": "Un lenguaje de programación",
                "d": "Un protocolo de comunicación"
            },
            "answer": "b"
        },
        {
            "question": "9. ¿Cuál es el propósito de un Load Balancer?",
            "options": {
                "a": "Almacenar datos de usuario",
                "b": "Distribuir tráfico entre múltiples servidores",
                "c": "Encriptar comunicaciones",
                "d": "Gestionar bases de datos"
            },
            "answer": "b"
        },
        {
            "question": "10. ¿Qué significa CAP en el teorema CAP?",
            "options": {
                "a": "Consistency, Availability, Partition tolerance",
                "b": "Capacity, Availability, Performance",
                "c": "Concurrency, Atomicity, Persistence",
                "d": "Cache, API, Protocol"
            },
            "answer": "a"
        },
        {
            "question": "11. ¿Cuál es una característica clave de las bases de datos NoSQL?",
            "options": {
                "a": "Siempre usan SQL",
                "b": "Esquema flexible",
                "c": "Solo almacenan números",
                "d": "Requieren transacciones ACID"
            },
            "answer": "b"
        },
        {
            "question": "12. ¿Qué es eventual consistency en sistemas distribuidos?",
            "options": {
                "a": "Los datos nunca son consistentes",
                "b": "Los datos son consistentes inmediatamente",
                "c": "Los datos se vuelven consistentes con el tiempo",
                "d": "Los datos se eliminan eventualmente"
            },
            "answer": "c"
        },
        {
            "question": "13. ¿Cuál es el propósito principal de un mensaje queue?",
            "options": {
                "a": "Almacenar archivos",
                "b": "Comunicación asíncrona entre servicios",
                "c": "Ejecutar código JavaScript",
                "d": "Gestionar usuarios"
            },
            "answer": "b"
        },
        {
            "question": "14. ¿Qué es Apache Kafka?",
            "options": {
                "a": "Un servidor web",
                "b": "Una plataforma de streaming de datos",
                "c": "Un sistema operativo",
                "d": "Un lenguaje de programación"
            },
            "answer": "b"
        },
        {
            "question": "15. ¿Cuál es la diferencia entre síncrono y asíncrono en comunicación?",
            "options": {
                "a": "Síncrono espera respuesta, asíncrono no",
                "b": "Asíncrono espera respuesta, síncrono no",
                "c": "No hay diferencia",
                "d": "Ambos esperan respuesta"
            },
            "answer": "a"
        },
        {
            "question": "16. ¿Qué es un CDN (Content Delivery Network)?",
            "options": {
                "a": "Una base de datos",
                "b": "Una red de servidores distribuidos para entregar contenido",
                "c": "Un protocolo de seguridad",
                "d": "Un lenguaje de programación"
            },
            "answer": "b"
        },
        {
            "question": "17. ¿Cuál es el propósito de caching en sistemas distribuidos?",
            "options": {
                "a": "Aumentar la latencia",
                "b": "Reducir el rendimiento",
                "c": "Mejorar el rendimiento y reducir latencia",
                "d": "Eliminar datos"
            },
            "answer": "c"
        },
        {
            "question": "18. ¿Qué es Redis?",
            "options": {
                "a": "Un servidor web",
                "b": "Una base de datos en memoria",
                "c": "Un sistema operativo",
                "d": "Un protocolo de red"
            },
            "answer": "b"
        },
        {
            "question": "19. ¿Cuál es una ventaja de usar servicios cloud?",
            "options": {
                "a": "Mayor control sobre hardware",
                "b": "Escalabilidad bajo demanda",
                "c": "Menor costo siempre",
                "d": "Mejor rendimiento siempre"
            },
            "answer": "b"
        },
        {
            "question": "20. ¿Qué significa IaaS en cloud computing?",
            "options": {
                "a": "Internet as a Service",
                "b": "Infrastructure as a Service",
                "c": "Integration as a Service",
                "d": "Intelligence as a Service"
            },
            "answer": "b"
        },
        {
            "question": "21. ¿Cuál es la diferencia entre PaaS y SaaS?",
            "options": {
                "a": "PaaS provee plataforma, SaaS provee software completo",
                "b": "SaaS provee plataforma, PaaS provee software completo",
                "c": "Son lo mismo",
                "d": "PaaS es más caro que SaaS"
            },
            "answer": "a"
        },
        {
            "question": "22. ¿Qué es auto-scaling en cloud computing?",
            "options": {
                "a": "Escalado manual de recursos",
                "b": "Escalado automático basado en demanda",
                "c": "Reducción permanente de recursos",
                "d": "Eliminación de servicios"
            },
            "answer": "b"
        },
        {
            "question": "23. ¿Cuál es el propósito de monitoring en sistemas distribuidos?",
            "options": {
                "a": "Eliminar logs",
                "b": "Observar el comportamiento y rendimiento del sistema",
                "c": "Reducir la funcionalidad",
                "d": "Aumentar la complejidad"
            },
            "answer": "b"
        },
        {
            "question": "24. ¿Qué es Prometheus?",
            "options": {
                "a": "Un servidor web",
                "b": "Un sistema de monitoreo y alertas",
                "c": "Una base de datos",
                "d": "Un lenguaje de programación"
            },
            "answer": "b"
        },
        {
            "question": "25. ¿Cuál es la función principal de un reverse proxy?",
            "options": {
                "a": "Almacenar datos",
                "b": "Actuar como intermediario entre clientes y servidores",
                "c": "Ejecutar aplicaciones",
                "d": "Gestionar bases de datos"
            },
            "answer": "b"
        },
        {
            "question": "26. ¿Qué es GraphQL?",
            "options": {
                "a": "Una base de datos",
                "b": "Un lenguaje de consulta para APIs",
                "c": "Un protocolo de red",
                "d": "Un sistema operativo"
            },
            "answer": "b"
        },
        {
            "question": "27. ¿Cuál es una ventaja de GraphQL sobre REST?",
            "options": {
                "a": "Más endpoints",
                "b": "Consultas más específicas y eficientes",
                "c": "Mayor complejidad",
                "d": "Menor flexibilidad"
            },
            "answer": "b"
        },
        {
            "question": "28. ¿Qué es un webhook?",
            "options": {
                "a": "Un tipo de base de datos",
                "b": "Un callback HTTP que se ejecuta cuando ocurre un evento",
                "c": "Un protocolo de seguridad",
                "d": "Un lenguaje de programación"
            },
            "answer": "b"
        },
        {
            "question": "29. ¿Cuál es el propósito de rate limiting?",
            "options": {
                "a": "Aumentar el número de requests",
                "b": "Controlar el número de requests por tiempo",
                "c": "Eliminar todos los requests",
                "d": "Acelerar las respuestas"
            },
            "answer": "b"
        },
        {
            "question": "30. ¿Qué es JWT (JSON Web Token)?",
            "options": {
                "a": "Un tipo de base de datos",
                "b": "Un estándar para transmitir información de forma segura",
                "c": "Un protocolo de red",
                "d": "Un lenguaje de programación"
            },
            "answer": "b"
        },
        {
            "question": "31. ¿Cuál es una característica importante de los sistemas distribuidos?",
            "options": {
                "a": "Centralización",
                "b": "Tolerancia a fallos",
                "c": "Dependencia única",
                "d": "Procesamiento secuencial"
            },
            "answer": "b"
        },
        {
            "question": "32. ¿Qué es sharding en bases de datos?",
            "options": {
                "a": "Eliminar datos",
                "b": "Dividir datos horizontalmente entre múltiples bases de datos",
                "c": "Combinar todas las tablas",
                "d": "Encriptar información"
            },
            "answer": "b"
        },
        {
            "question": "33. ¿Cuál es el propósito de un health check?",
            "options": {
                "a": "Eliminar servicios",
                "b": "Verificar el estado de un servicio",
                "c": "Acelerar las respuestas",
                "d": "Reducir la memoria"
            },
            "answer": "b"
        },
        {
            "question": "34. ¿Qué es idempotencia en APIs?",
            "options": {
                "a": "Ejecutar una operación múltiples veces produce el mismo resultado",
                "b": "Ejecutar una operación una sola vez",
                "c": "Cambiar el resultado cada vez",
                "d": "Eliminar datos automáticamente"
            },
            "answer": "a"
        },
        {
            "question": "35. ¿Cuál es la diferencia entre stateful y stateless?",
            "options": {
                "a": "Stateful mantiene estado, stateless no",
                "b": "Stateless mantiene estado, stateful no",
                "c": "Son lo mismo",
                "d": "Stateful es más rápido"
            },
            "answer": "a"
        },
        {
            "question": "36. ¿Qué es un service mesh?",
            "options": {
                "a": "Una base de datos",
                "b": "Una capa de infraestructura para comunicación entre servicios",
                "c": "Un protocolo de red",
                "d": "Un lenguaje de programación"
            },
            "answer": "b"
        },
        {
            "question": "37. ¿Cuál es el propósito de Istio?",
            "options": {
                "a": "Gestionar bases de datos",
                "b": "Proporcionar service mesh capabilities",
                "c": "Ejecutar aplicaciones",
                "d": "Almacenar archivos"
            },
            "answer": "b"
        },
        {
            "question": "38. ¿Qué es observability en sistemas distribuidos?",
            "options": {
                "a": "Eliminar logs",
                "b": "Capacidad de entender el estado interno del sistema",
                "c": "Reducir la funcionalidad",
                "d": "Aumentar la complejidad"
            },
            "answer": "b"
        },
        {
            "question": "39. ¿Cuáles son los tres pilares de observability?",
            "options": {
                "a": "CPU, Memory, Disk",
                "b": "Logs, Metrics, Traces",
                "c": "Frontend, Backend, Database",
                "d": "HTTP, TCP, UDP"
            },
            "answer": "b"
        },
        {
            "question": "40. ¿Qué es distributed tracing?",
            "options": {
                "a": "Eliminar logs",
                "b": "Rastrear requests a través de múltiples servicios",
                "c": "Reducir la latencia",
                "d": "Aumentar la seguridad"
            },
            "answer": "b"
        },
        {
            "question": "41. ¿Cuál es el propósito de un message broker?",
            "options": {
                "a": "Almacenar archivos",
                "b": "Facilitar la comunicación entre servicios mediante mensajes",
                "c": "Ejecutar código",
                "d": "Gestionar usuarios"
            },
            "answer": "b"
        },
        {
            "question": "42. ¿Qué es RabbitMQ?",
            "options": {
                "a": "Un servidor web",
                "b": "Un message broker",
                "c": "Una base de datos",
                "d": "Un sistema operativo"
            },
            "answer": "b"
        },
        {
            "question": "43. ¿Cuál es la diferencia entre pub/sub y request/response?",
            "options": {
                "a": "Pub/sub es asíncrono, request/response es síncrono",
                "b": "Request/response es asíncrono, pub/sub es síncrono",
                "c": "Son lo mismo",
                "d": "Pub/sub es más lento"
            },
            "answer": "a"
        },
        {
            "question": "44. ¿Qué es eventual consistency?",
            "options": {
                "a": "Los datos nunca son consistentes",
                "b": "Los datos se vuelven consistentes después de un tiempo",
                "c": "Los datos son siempre consistentes",
                "d": "Los datos se eliminan"
            },
            "answer": "b"
        },
        {
            "question": "45. ¿Cuál es el propósito de un circuit breaker pattern?",
            "options": {
                "a": "Acelerar las respuestas",
                "b": "Prevenir cascading failures",
                "c": "Almacenar datos",
                "d": "Ejecutar código"
            },
            "answer": "b"
        },
        {
            "question": "46. ¿Qué es blue-green deployment?",
            "options": {
                "a": "Una estrategia de despliegue con dos entornos idénticos",
                "b": "Un tipo de base de datos",
                "c": "Un protocolo de red",
                "d": "Un lenguaje de programación"
            },
            "answer": "a"
        },
        {
            "question": "47. ¿Cuál es la ventaja de canary deployment?",
            "options": {
                "a": "Desplegar a todos los usuarios inmediatamente",
                "b": "Probar cambios con un subconjunto de usuarios",
                "c": "Eliminar funcionalidades",
                "d": "Reducir el rendimiento"
            },
            "answer": "b"
        },
        {
            "question": "48. ¿Qué es Infrastructure as Code (IaC)?",
            "options": {
                "a": "Escribir código para aplicaciones",
                "b": "Gestionar infraestructura mediante código",
                "c": "Eliminar infraestructura",
                "d": "Programar en assembly"
            },
            "answer": "b"
        },
        {
            "question": "49. ¿Cuál es una herramienta popular para IaC?",
            "options": {
                "a": "Photoshop",
                "b": "Terraform",
                "c": "Word",
                "d": "Excel"
            },
            "answer": "b"
        },
        {
            "question": "50. ¿Qué es continuous integration (CI)?",
            "options": {
                "a": "Integrar código frecuentemente",
                "b": "Nunca integrar código",
                "c": "Integrar código una vez al año",
                "d": "Eliminar código"
            },
            "answer": "a"
        },
        {
            "question": "51. ¿Cuál es el propósito de continuous deployment (CD)?",
            "options": {
                "a": "Nunca desplegar",
                "b": "Desplegar automáticamente después de CI",
                "c": "Desplegar manualmente",
                "d": "Eliminar aplicaciones"
            },
            "answer": "b"
        },
        {
            "question": "52. ¿Qué es DevOps?",
            "options": {
                "a": "Solo desarrollo",
                "b": "Cultura que une desarrollo y operaciones",
                "c": "Solo operaciones",
                "d": "Un lenguaje de programación"
            },
            "answer": "b"
        },
        {
            "question": "53. ¿Cuál es una métrica importante en sistemas distribuidos?",
            "options": {
                "a": "Número de líneas de código",
                "b": "Latencia",
                "c": "Color de la interfaz",
                "d": "Tamaño de archivos"
            },
            "answer": "b"
        },
        {
            "question": "54. ¿Qué es SLA (Service Level Agreement)?",
            "options": {
                "a": "Un tipo de base de datos",
                "b": "Un acuerdo sobre el nivel de servicio",
                "c": "Un protocolo de red",
                "d": "Un lenguaje de programación"
            },
            "answer": "b"
        },
        {
            "question": "55. ¿Cuál es una característica de sistemas de alta disponibilidad?",
            "options": {
                "a": "Fallan frecuentemente",
                "b": "Están disponibles la mayor parte del tiempo",
                "c": "Son lentos",
                "d": "Consumen mucha energía"
            },
            "answer": "b"
        },
        {
            "question": "56. ¿Qué es disaster recovery?",
            "options": {
                "a": "Causar desastres",
                "b": "Plan para recuperarse de fallos catastróficos",
                "c": "Eliminar datos",
                "d": "Reducir funcionalidad"
            },
            "answer": "b"
        },
        {
            "question": "57. ¿Cuál es el propósito de backup en sistemas distribuidos?",
            "options": {
                "a": "Eliminar datos",
                "b": "Proteger contra pérdida de datos",
                "c": "Acelerar el sistema",
                "d": "Reducir costos"
            },
            "answer": "b"
        },
        {
            "question": "58. ¿Qué es multi-tenancy?",
            "options": {
                "a": "Una sola aplicación para un usuario",
                "b": "Una aplicación compartida por múltiples usuarios",
                "c": "Múltiples aplicaciones para un usuario",
                "d": "Eliminar usuarios"
            },
            "answer": "b"
        },
        {
            "question": "59. ¿Cuál es una consideración importante en security para sistemas distribuidos?",
            "options": {
                "a": "Ignorar la seguridad",
                "b": "Autenticación y autorización",
                "c": "Usar contraseñas simples",
                "d": "Compartir credenciales"
            },
            "answer": "b"
        },
        {
            "question": "60. ¿Qué es zero-trust security?",
            "options": {
                "a": "Confiar en todos",
                "b": "No confiar en nada por defecto",
                "c": "Confiar solo en usuarios internos",
                "d": "Eliminar toda seguridad"
            },
            "answer": "b"
        }
    ]
    
    random.shuffle(questions)
    
    score = 0
    total_questions = len(questions)
    
    print("¡Bienvenido al Examen de Sistemas Distribuidos y Computación en la Nube!")
    print(f"Tienes {total_questions} preguntas para responder.")
    print("Selecciona la opción correcta (a, b, c, d).\n")
    
    for i, q in enumerate(questions, 1):
        print(f"Pregunta {i}: {q['question']}")
        for key, value in q['options'].items():
            print(f"  {key}) {value}")
        
        while True:
            answer = input("Tu respuesta: ").lower().strip()
            if answer in ['a', 'b', 'c', 'd']:
                break
            print("Por favor, ingresa una opción válida (a, b, c, d)")
        
        if answer == q['answer']:
            print("¡Correcto! ✓")
            score += 1
        else:
            correct_option = q['options'][q['answer']]
            print(f"Incorrecto. La respuesta correcta es: {q['answer']}) {correct_option}")
        
        print("-" * 50)
    
    percentage = (score / total_questions) * 100
    print(f"\nResultado final: {score}/{total_questions} ({percentage:.1f}%)")
    
    if percentage >= 70:
        print("¡Excelente trabajo! Has aprobado el examen.")
    else:
        print("Necesitas estudiar más. ¡Sigue practicando!")

if __name__ == "__main__":
    run_quiz()