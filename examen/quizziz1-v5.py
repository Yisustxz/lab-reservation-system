import random

def run_quiz():
    questions = [
        {
            "question": "1. La transparencia es la capacidad de ocultar al usuario y al programador de aplicaciones _______________",
            "options": {
                "a": "el código fuente",
                "b": "la separación de los componentes",
                "c": "los errores de compilación",
                "d": "las restricciones de hardware"
            },
            "answer": "b"
        },
        {
            "question": "2. Un sistema distribuido organizado en una capa de middleware… ofreciendo a cada aplicación _______________",
            "options": {
                "a": "el mismo idioma",
                "b": "una interfaz única",
                "c": "su propia red",
                "d": "aislamiento total"
            },
            "answer": "b"
        },
        {
            "question": "3. Middleware es al sistema distribuido lo que el _______________ es a una computadora.",
            "options": {
                "a": "disco duro",
                "b": "sistema operativo",
                "c": "software de red",
                "d": "router"
            },
            "answer": "b"
        },
        {
            "question": "4. Un sistema es escalable si conserva su efectividad cuando ocurre un incremento significativo en _______________",
            "options": {
                "a": "el consumo eléctrico",
                "b": "la cantidad de cables",
                "c": "el número de recursos y usuarios",
                "d": "la tasa de errores"
            },
            "answer": "c"
        },
        {
            "question": "5. Se define como transparencia de concurrencia la capacidad de _______________",
            "options": {
                "a": "ejecutar programas en modo batch",
                "b": "operar en modo aislado",
                "c": "permitir que varios procesos operen a la vez sin interferencia",
                "d": "eliminar los hilos paralelos"
            },
            "answer": "c"
        },
        {
            "question": "6. El algoritmo de Berkeley requiere que _______________",
            "options": {
                "a": "cada nodo tenga un reloj atómico",
                "b": "todas las máquinas respondan con su hora",
                "c": "la red esté sincronizada con UTC",
                "d": "todos los procesos compartan el mismo PID"
            },
            "answer": "b"
        },
        {
            "question": "7. En la relación 'ocurre-antes' (→), si a es el envío y b la recepción, entonces _______________",
            "options": {
                "a": "b → a",
                "b": "b y a son simultáneos",
                "c": "a → b",
                "d": "no hay relación causal"
            },
            "answer": "c"
        },
        {
            "question": "8. Un demonio de tiempo les indica a todos cómo _______________",
            "options": {
                "a": "iniciar la conexión",
                "b": "responder al cliente",
                "c": "ajustar sus relojes",
                "d": "detener sus procesos"
            },
            "answer": "c"
        },
        {
            "question": "9. El middleware proporciona los medios para que los componentes de una sola aplicación distribuida _______________",
            "options": {
                "a": "compitan entre sí",
                "b": "se comuniquen entre sí",
                "c": "usen recursos propietarios",
                "d": "se bloqueen mutuamente"
            },
            "answer": "b"
        },
        {
            "question": "10. El estilo arquitectónico define una familia de sistemas en términos de _______________",
            "options": {
                "a": "drivers de red",
                "b": "comandos shell",
                "c": "patrones estructurales, de control y de comunicación",
                "d": "ubicaciones geográficas"
            },
            "answer": "c"
        },
        {
            "question": "11. Un componente es una unidad modular con interfaces _______________",
            "options": {
                "a": "desactivadas",
                "b": "privadas",
                "c": "ocultas",
                "d": "requeridas y proporcionadas bien definidas"
            },
            "answer": "d"
        },
        {
            "question": "12. Cuando el destinatario no se está ejecutando, los mensajes se _______________",
            "options": {
                "a": "almacenan indefinidamente",
                "b": "enrutan de nuevo",
                "c": "descartan",
                "d": "transmiten por UDP"
            },
            "answer": "c"
        },
        {
            "question": "13. En un modelo ideal de coordinación basado en eventos, una notificación publicada _______________",
            "options": {
                "a": "se elimina tras 10 segundos",
                "b": "requiere acuse de recibo",
                "c": "se entrega exactamente a los suscriptores correspondientes",
                "d": "solo se almacena en caché"
            },
            "answer": "c"
        },
        {
            "question": "14. El acoplamiento referencial aparece generalmente en forma de _______________",
            "options": {
                "a": "referencias explícitas en la comunicación",
                "b": "sincronía temporal",
                "c": "acuse de recibo múltiple",
                "d": "broadcast inalámbrico"
            },
            "answer": "a"
        },
        {
            "question": "15. Una arquitectura en capas con llamadas ascendentes se denomina _______________",
            "options": {
                "a": "mixta",
                "b": "lineal",
                "c": "distribuida",
                "d": "inversa"
            },
            "answer": "a"
        },
        {
            "question": "16. El middleware también ofrece servicios de seguridad, contabilidad y _______________",
            "options": {
                "a": "autenticación gráfica",
                "b": "configuración de BIOS",
                "c": "recuperación de fallos",
                "d": "reducción de latencia"
            },
            "answer": "c"
        },
        {
            "question": "17. Un sistema distribuido debe estar abierto, ser escalable, compartir recursos y _______________",
            "options": {
                "a": "requerir poca RAM",
                "b": "tener una única IP",
                "c": "ocultar que los recursos están distribuidos",
                "d": "tener pantalla gráfica"
            },
            "answer": "c"
        },
        {
            "question": "18. Un proceso puede publicar una notificación que describe _______________",
            "options": {
                "a": "la caída de la red",
                "b": "la ocurrencia de un evento",
                "c": "la conexión de sockets",
                "d": "la apertura de puertos"
            },
            "answer": "b"
        },
        {
            "question": "19. En los sistemas distribuidos se define el término 'movilidad' como la capacidad de _______________",
            "options": {
                "a": "usar Bluetooth",
                "b": "reubicar recursos sin afectar la operación",
                "c": "pausar tareas en tiempo real",
                "d": "bloquear accesos"
            },
            "answer": "b"
        },
        {
            "question": "20. El algoritmo de Lamport requiere que se actualice el contador _______________",
            "options": {
                "a": "C1 ← C1 - 1",
                "b": "Ci ← Ci + 1",
                "c": "T ← UTC",
                "d": "Cmax ← C(a)"
            },
            "answer": "b"
        },
        {
            "question": "21. En coordinación directa los procesos están acoplados temporal y _______________",
            "options": {
                "a": "físicamente",
                "b": "sintácticamente",
                "c": "referencialmente",
                "d": "lógicamente"
            },
            "answer": "c"
        },
        {
            "question": "22. Cuando se pierde el token en un algoritmo de anillo, se pierde la _______________",
            "options": {
                "a": "prioridad",
                "b": "seguridad",
                "c": "exclusión mutua",
                "d": "conectividad"
            },
            "answer": "c"
        },
        {
            "question": "23. Un protocolo que entrega el mensaje más de una vez ante fallos es de tipo _______________",
            "options": {
                "a": "best-effort",
                "b": "at-least-once",
                "c": "once-and-only",
                "d": "null-safe"
            },
            "answer": "b"
        },
        {
            "question": "24. Los estilos arquitectónicos más importantes para sistemas distribuidos incluyen: en capas, orientados a objetos, y _______________",
            "options": {
                "a": "dinámicos",
                "b": "mixtos",
                "c": "basados en eventos",
                "d": "monolíticos"
            },
            "answer": "c"
        },
        {
            "question": "25. El problema de sincronización de relojes puede derivar en resultados inconsistentes como _______________",
            "options": {
                "a": "doble cacheo",
                "b": "clocks loops",
                "c": "valores diferentes en nodos replicados",
                "d": "replicación recursiva"
            },
            "answer": "c"
        },
        {
            "question": "26. Un mensaje contiene el nombre del recurso, el identificador del proceso y _______________",
            "options": {
                "a": "su protocolo TCP",
                "b": "el tamaño del recurso",
                "c": "el tiempo lógico",
                "d": "el checksum"
            },
            "answer": "c"
        },
        {
            "question": "27. Un sistema distribuido es coherente si _______________",
            "options": {
                "a": "ofrece la misma interfaz gráfica",
                "b": "opera de la misma manera sin importar dónde ni cómo se lleva a cabo la interacción",
                "c": "usa JSON",
                "d": "se ejecuta en Java"
            },
            "answer": "b"
        },
        {
            "question": "28. Un proceso puede suscribirse a un tipo específico de notificación, recibiendo solamente _______________",
            "options": {
                "a": "mensajes UDP",
                "b": "logs XML",
                "c": "lo que haya solicitado explícitamente",
                "d": "respuestas JSON"
            },
            "answer": "c"
        },
        {
            "question": "29. La exclusión mutua garantiza que _______________",
            "options": {
                "a": "todos accedan al recurso",
                "b": "solo un proceso a la vez acceda a un recurso",
                "c": "los errores se distribuyan",
                "d": "los relojes estén sincronizados"
            },
            "answer": "b"
        },
        {
            "question": "30. En arquitecturas orientadas a recursos, el método de acceso (GET, POST, etc.) se traduce en _______________",
            "options": {
                "a": "una transacción",
                "b": "un token",
                "c": "una acción",
                "d": "una interrupción"
            },
            "answer": "c"
        }
    ]
    
    random.shuffle(questions)
    
    score = 0
    total_questions = len(questions)
    
    print("📘 Cuestionario de Estudio (Estilo Completación) - Sistemas Distribuidos")
    print(f"Total de preguntas: {total_questions}")
    print("Completa cada enunciado seleccionando la opción correcta (a, b, c, d).\n")
    
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
        print("¡Excelente trabajo! Has aprobado el cuestionario.")
    else:
        print("Necesitas repasar más. ¡Sigue estudiando!")

if __name__ == "__main__":
    run_quiz()