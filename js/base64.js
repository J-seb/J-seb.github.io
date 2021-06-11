// Función para obtener el base 64 de una imagen, devuelve una promesa ya que el filereader es asincrono
export function getBase64(file) {
  return new Promise(function (resolve, reject) {
    // Filereader es una nueva api implementada con javascript que me permite obtener base64 a partir de un blob
    var reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
