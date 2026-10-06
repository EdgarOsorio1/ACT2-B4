# RegistroProductos

Para esta actividad se creó un formulario reactivo en Angular para registrar productos, con los campos nombre, descripción, precio, categoría y stock. Cada campo tiene sus validaciones, el formulario muestra mensajes de error cuando algo está mal escrito y los datos solo se envían a un servicio cuando el formulario es válido.

El código se organizó en tres partes. En producto.model.ts está la interfaz Producto, que define los cinco campos con su tipo de dato. En producto.service.ts está el servicio ProductoService, que simula el envío de los datos a un backend y los muestra en la consola. En producto-form.component están el formulario, su vista y sus estilos. El formulario se construyó con FormBuilder y se conecta al HTML con [formGroup] y formControlName.

Las validaciones definidas fueron: nombre obligatorio con mínimo 3 caracteres, descripción obligatoria con mínimo 10 caracteres, precio obligatorio y mayor o igual a 0.01, categoría obligatoria y stock obligatorio y no menor que 0. Los errores se muestran con *ngIf y *ngFor debajo de cada campo, solo cuando el campo ya fue tocado o modificado, y los campos con error se resaltan con borde rojo. El botón cambia a "Enviando..." mientras se procesa y al terminar aparece un mensaje de éxito en verde.

El servicio se inyecta en el componente por el constructor. Al presionar "Registrar producto", si el formulario es inválido se muestran todos los errores y no se envía nada; si es válido, el producto se manda al servicio, se muestra en la consola y el formulario se limpia.

Se probaron varios casos: formulario vacío, nombre muy corto, descripción muy corta, precio en 0, stock negativo y datos válidos. En todos los casos los mensajes de error y el envío funcionaron como se esperaba.

Separar el modelo, el servicio y el componente hace el código más ordenado y fácil de mantener, ya que si se necesita cambiar algo del envío de datos solo se modifica el servicio sin afectar el formulario.
