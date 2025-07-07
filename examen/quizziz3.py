import random

def run_quiz():
    questions = [
        {
            "question": "1. se refiere a la capacidad de una plataforma en la nube para manejar un mayor volumen de usuarios o datos sin degradar el rendimiento.",
            "options": {
                "a": "Escalabilidad",
                "b": "Aprovisionamiento",
                "c": "Virtualización",
                "d": "orquestación de contenedores"
            },
            "answer": "a"
        },
        {
            "question": "2. permite a las empresas agregar o eliminar recursos automáticamente en función de las necesidades de la plataforma.",
            "options": {
                "a": "Virtualización",
                "b": "Automatización",
                "c": "Aprovisionamiento",
                "d": "Escalabilidad",
                "e": "orquestación de contenedores"
            },
            "answer": "c"
        },
        {
            "question": "3. La elasticidad en la nube se puede lograr mediante la adición de más servidores",
            "options": {
                "a": "Escalabilidad vertical",
                "b": "Escalabilidad horizontal",
                "c": "orquestación de contenedores",
                "d": "Virtualización",
                "e": "Automatización"
            },
            "answer": "b"
        },
        {
            "question": "4. La elasticidad en la nube se puede lograr aumentando la capacidad de los servidores existentes",
            "options": {
                "a": "Virtualización",
                "b": "Escalabilidad horizontal",
                "c": "Escalabilidad vertical",
                "d": "Automatización",
                "e": "orquestación de contenedores"
            },
            "answer": "c"
        },
        {
            "question": "5. se refiere a la capacidad de una plataforma en la nube para aumentar o disminuir automáticamente los recursos de cómputo, almacenamiento y ancho de banda según sea necesario.",
            "options": {
                "a": "Escalabilidad horizontal",
                "b": "orquestación de contenedores",
                "c": "elasticidad",
                "d": "Automatización",
                "e": "Escalabilidad vertical"
            },
            "answer": "c"
        },
        {
            "question": "6. es capaz de expandirse o contraerse según la carga de trabajo, lo que permite un uso eficiente de los recursos.",
            "options": {
                "a": "elasticidad",
                "b": "sistema elástico",
                "c": "Escalabilidad horizontal",
                "d": "Automatización",
                "e": "Escalabilidad vertical"
            },
            "answer": "b"
        },
        {
            "question": "7. se refiere a la capacidad de un sistema para manejar una mayor cantidad de carga de trabajo a medida que se expande.",
            "options": {
                "a": "Escalabilidad vertical",
                "b": "sistema elástico",
                "c": "Escalabilidad",
                "d": "elasticidad",
                "e": "Automatización"
            },
            "answer": "c"
        },
        {
            "question": "8. automatiza el suministro den infraestructura, lo que permite a su organización desarrollar, implementar y escalar aplicaciones en la nube con mayor velocidad, menor riesgo y menor costo.",
            "options": {
                "a": "IaC",
                "b": "Infraestructura como código (IaC)",
                "c": "Infraestructura inmutable",
                "d": "Infraestructura mutable"
            },
            "answer": "b"
        },
        {
            "question": "9. permite a los desarrolladores codificar la infraestructura de una forma que hace que el suministro sea automatizado, rápido y replicable.",
            "options": {
                "a": "IaC",
                "b": "Infraestructura como código (IaC)",
                "c": "Infraestructura inmutable",
                "d": "Infraestructura mutable"
            },
            "answer": "a"
        },
        {
            "question": "10. es la infraestructura que se puede modificar o actualizar después de suministrase inicialmente.",
            "options": {
                "a": "IaC",
                "b": "Infraestructura como código (IaC)",
                "c": "Infraestructura mutable",
                "d": "Infraestructura inmutable"
            },
            "answer": "c"
        },
        {
            "question": "11. es una infraestructura que no se puede modificar una vez suministrada inicialmente.",
            "options": {
                "a": "Infraestructura inmutable",
                "b": "Infraestructura mutable",
                "c": "Infraestructura como código (IaC)",
                "d": "IaC"
            },
            "answer": "a"
        },
        {
            "question": "12. proporciona un conjunto de procesos y herramientas y ayuda a garantizar que cada entorno y aplicación tengan su propia configuración.",
            "options": {
                "a": "IaC",
                "b": "Infraestructura mutable",
                "c": "Infraestructura como código (IaC)",
                "d": "Administración de la configuración",
                "e": "Infraestructura inmutable"
            },
            "answer": "d"
        },
        {
            "question": "13. Es una herramienta decodificación declarativa que permite a los desarrolladores utilizar un lenguaje de configuración denominado HCL para describir la nube de 'estado final' deseada o la infraestructura local para ejecutar una aplicación.",
            "options": {
                "a": "Ansible",
                "b": "Infraestructura mutable",
                "c": "Infraestructura inmutable",
                "d": "Terraform"
            },
            "answer": "d"
        },
        {
            "question": "14. Proyecto comunitario de código abierto patrocinado por Red Hat que está diseñado para ayudar a las organizaciones a automatizar el suministro, la gestión de la configuración y la implementación de aplicaciones.",
            "options": {
                "a": "Infraestructura mutable",
                "b": "Terraform",
                "c": "Infraestructura inmutable",
                "d": "Ansible"
            },
            "answer": "d"
        },
        {
            "question": "15. permiten un análisis de datos más rápido y exhaustivo, creando la oportunidad de obtener conocimientos más profundos, tiempos de respuesta más rápidos y mejores experiencias del cliente.",
            "options": {
                "a": "Data lake",
                "b": "edge computing",
                "c": "Cloud IoT",
                "d": "Big data"
            },
            "answer": "b"
        },
        {
            "question": "16. trata sobre el mecanismo de entrega de sistemas de software. Se trata de unir a las personas, hacer que colaboren y se comuniquen, trabajar juntos hacia un objetivo y una visión comunes.",
            "options": {
                "a": "Cloud IoT",
                "b": "edge computing",
                "c": "DevOps",
                "d": "Big data",
                "e": "Data lake"
            },
            "answer": "c"
        },
        {
            "question": "17. Es un conjunto de principios y prácticas que reúne tanto a los desarrolladores como a los equipos de operaciones desde el inicio del sistema de software para una entrega de principio a fin más rápida, veloz y eficiente del sistema de software al consumidor final, una y otra vez de manera coherente y predecible reduciendo el tiempo de comercialización, obteniendo así una ventaja competitiva.",
            "options": {
                "a": "DevOps",
                "b": "Big data",
                "c": "Data lake",
                "d": "edge computing",
                "e": "Cloud IoT"
            },
            "answer": "a"
        },
        {
            "question": "18. se refiere a los conjuntos de datos cuyo tamaño esta mas allá de las capacidades de las herramientas típicas de software de bases de datos para capturar, almacenar, gestionar y analizar",
            "options": {
                "a": "Data lake",
                "b": "edge computing",
                "c": "Cloud IoT",
                "d": "Big data"
            },
            "answer": "d"
        },
        {
            "question": "19. excede el alcance de los entornos de hardware de uso común y herramientas de software para capturar, gestionar y procesar los datos dentro de un tiempo transcurrido tolerable para su población de usuarios",
            "options": {
                "a": "Big data",
                "b": "Data lake",
                "c": "edge computing",
                "d": "Cloud IoT"
            },
            "answer": "a"
        },
        {
            "question": "20. es un tipo de informática que ocurre en la ubicación física del usuario, de la fuente de datos, o cerca de ellas. Esto permite que los usuarios obtengan servicios más rápidos y confiables",
            "options": {
                "a": "Data lake",
                "b": "edge computing",
                "c": "Big data",
                "d": "Cloud IoT"
            },
            "answer": "b"
        },
        {
            "question": "21. es un entorno de almacenamiento de bajo costo, que normalmente alberga petabytes de datos sin procesar.",
            "options": {
                "a": "Big data",
                "b": "Cloud IoT",
                "c": "Data lake",
                "d": "edge computing"
            },
            "answer": "c"
        },
        {
            "question": "22. se les asocian comúnmente con Apache Hadoop, software de código abierto que proporciona un procesamiento distribuido confiable y de bajo costo para el almacenamiento de Big Data.",
            "options": {
                "a": "Data lake",
                "b": "edge computing",
                "c": "Big data",
                "d": "Cloud IoT"
            },
            "answer": "a"
        },
        {
            "question": "23. requieren un esquema definido para adaptarse a requisitos específicos de análisis de datos. La estructura subyacente de un almacén de datos normalmente se organiza como un sistema relacional (es decir, en un formato de datos estructurados), que obtiene datos de bases de datos transaccionales.",
            "options": {
                "a": "edge computing",
                "b": "Data warehouse",
                "c": "Data lake",
                "d": "Big data",
                "e": "Cloud IoT"
            },
            "answer": "b"
        },
        {
            "question": "24. Plataformas permiten conectar dispositivos físicos a través de internet a servicios de procesamiento de datos, almacenamiento de datos y aplicaciones. Son una solución práctica para la monitorización remota, el control y la gestión de datos.",
            "options": {
                "a": "Data lake",
                "b": "edge computing",
                "c": "Data warehouse",
                "d": "Cloud IoT",
                "e": "Big data"
            },
            "answer": "d"
        },
        {
            "question": "25. Conjuntos de datos cuyo tamaño o tipo está más allá de la capacidad de las tradicionales bases de datos relacionales para capturar, gestionar y procesar los datos con baja latencia.",
            "options": {
                "a": "Cloud IoT",
                "b": "edge computing",
                "c": "Data lake",
                "d": "Data warehouse",
                "e": "Big data"
            },
            "answer": "e"
        },
        {
            "question": "26. son diferentes de las fuentes de datos tradicionales que almacenan datos estructurados en las bases de datos relacionales.",
            "options": {
                "a": "edge computing",
                "b": "Big data",
                "c": "Cloud IoT",
                "d": "Data warehouse",
                "e": "Data lake"
            },
            "answer": "b"
        },
        {
            "question": "27. datos con formato o esquema fijo que poseen campos fijos.",
            "options": {
                "a": "datos no estructurados",
                "b": "datos estructurados",
                "c": "datos semiestructurados"
            },
            "answer": "b"
        },
        {
            "question": "28. se componen de piezas de información que se conocen de antemano, vienen en un formato especificado, y se producen en un orden especificado.",
            "options": {
                "a": "datos semiestructurados",
                "b": "datos estructurados",
                "c": "datos no estructurados"
            },
            "answer": "b"
        },
        {
            "question": "29. tienen un flujo lógico y un formato que puede ser definido, pero no es fácil su comprensión por el usuario. y sus datos no tienen formatos fijos, pero contienen etiquetas y otros marcadores que permiten separar los elementos",
            "options": {
                "a": "datos semiestructurados",
                "b": "datos no estructurados",
                "c": "datos estructurados"
            },
            "answer": "a"
        },
        {
            "question": "30. son datos sin tipos predefinidos. Se almacenan como “documentos” u “objetos” sin estructura uniforme, y se tiene poco o ningún control sobre ellos.",
            "options": {
                "a": "datos estructurados",
                "b": "datos semiestructurados",
                "c": "datos no estructurados"
            },
            "answer": "c"
        },
        {
            "question": "31. se compone de una serie de capas o etapas que manejan los datos, desde su captura de las diferentes fuentes de datos hasta su etapa final de visualización de los resultados obtenidos.",
            "options": {
                "a": "Procesamiento de datos",
                "b": "Almacenamiento",
                "c": "Arquitectura de big data"
            },
            "answer": "c"
        },
        {
            "question": "32. se refiere a las técnicas y teorías implicadas en el proceso de adquirir, limpiar, ordenar, procesar, mostrar, almacenar, los datos que nos pueden ayudar a detectar problemas en nuestro negocio o a optimizar y mejorar nuestros procesos.",
            "options": {
                "a": "ciencia de datos",
                "b": "Procesamiento de datos",
                "c": "Almacenamiento",
                "d": "Arquitectura de big data"
            },
            "answer": "a"
        },
        {
            "question": "33. son soluciones probabas para abordar problemas de diseño conocidos. Consisten en guías de orientación y descripciones documentadas para resolver un problema.",
            "options": {
                "a": "Patron de nivelación de carga basada en cola",
                "b": "consumidores en competencia",
                "c": "Patrones de mensajería",
                "d": "Patrones de diseño",
                "e": "cola de prioridad"
            },
            "answer": "d"
        },
        {
            "question": "34. ayudan a conectar servicios de forma flexible.",
            "options": {
                "a": "consumidores en competencia",
                "b": "Patron de nivelación de carga basada en cola",
                "c": "cola de prioridad",
                "d": "Patrones de mensajería",
                "e": "Patrones de diseño"
            },
            "answer": "d"
        },
        {
            "question": "35. ayuda en la compilación y validación del código introducido/registrado por un desarrollador al llevarlo a cabo a través de una serie de pasos de validación.",
            "options": {
                "a": "Integración continua",
                "b": "Patrones de mensajería",
                "c": "Patrones de diseño",
                "d": "Patron de nivelación de carga basada en cola",
                "e": "consumidores en competencia"
            },
            "answer": "a"
        },
        {
            "question": "36. son la capacidad de generar paquetes de aplicaciones de una manera que se puedan implementar fácilmente en cualquier entorno.",
            "options": {
                "a": "Patrones de mensajería",
                "b": "consumidores en competencia",
                "c": "Practicas de entrega continua",
                "d": "Integración continua",
                "e": "Implementación continua"
            },
            "answer": "c"
        },
        {
            "question": "37. se refiere a la capacidad de implementar aplicaciones en entornos de preproducción y producción.",
            "options": {
                "a": "Integración continua",
                "b": "Patrones de mensajería",
                "c": "Patron de nivelación de carga basada en cola",
                "d": "consumidores en competencia",
                "e": "Implementación continua"
            },
            "answer": "e"
        },
        {
            "question": "38. ayuda a implementar una solución cuando varios consumidores están listos para procesar el mensaje entrante y compiten por ello.",
            "options": {
                "a": "Patrones de diseño",
                "b": "Patrones de mensajería",
                "c": "Patron de nivelación de carga basada en cola",
                "d": "cola de prioridad",
                "e": "consumidores en competencia"
            },
            "answer": "e"
        },
        {
            "question": "39. es un patrón que ayuda en la implementación de operaciones de lectura y escritura utilizando para ello diferentes interfaces.",
            "options": {
                "a": "Patrones de mensajería",
                "b": "consumidores en competencia",
                "c": "Patrones de diseño",
                "d": "Patron de nivelación de carga basada en cola",
                "e": "Ppatron CQRS"
            },
            "answer": "e"
        },
        {
            "question": "40. patrón que ayuda a limitar el número de solicitudes que se permite ejecutar.",
            "options": {
                "a": "Patrón de limitación",
                "b": "Ppatron CQRS",
                "c": "Patrones de diseño",
                "d": "Patrones de mensajería",
                "e": "consumidores en competencia"
            },
            "answer": "a"
        },
        {
            "question": "41. es un patrón extremadamente importante que permite que las aplicaciones y los servicios ofrezcan una mayor resistencia a fallos transitorios.",
            "options": {
                "a": "Ppatron CQRS",
                "b": "Patrones de reintento",
                "c": "Patrón de limitación",
                "d": "Patrones de mensajería",
                "e": "consumidores en competencia"
            },
            "answer": "b"
        },
        {
            "question": "42. Este servicio actúa como un proxy en relación con el servicio original. El objetivo de este servicio de proxy es mantener una máquina de estados y actuar como una puerta de enlace al servicio original.",
            "options": {
                "a": "Ppatron CQRS",
                "b": "Patrón de limitación",
                "c": "consumidores en competencia",
                "d": "Patrones de reintento",
                "e": "Patrón de interruptor de circuito"
            },
            "answer": "e"
        },
    ]

    score = 0
    total_questions = len(questions)

    # Opcional: Barajar las preguntas para que salgan en un orden diferente cada vez
    random.shuffle(questions)

    print("--- ¡Bienvenido al Examen 3 - Nube! ---")
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

# Para ejecutar el quiz:
if __name__ == "__main__":
    run_quiz()