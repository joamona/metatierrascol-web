export function validateIdDocument(tipoDocumento: string, numeroDocumento: string): boolean {
    // Diccionario con los patrones para cada tipo de documento
    const patrones: { [key: string]: RegExp } = {
        'CC': /^\d{1,10}$/,  // Cédula de Ciudadanía: Hasta 10 dígitos
        'CE': /^\d{1,15}$/,  // Cédula de Extranjería: Hasta 15 dígitos
        'NIT': /^\d{1,9}-\d{1}$/,  // NIT: Hasta 9 dígitos seguidos de un guion y un dígito verificador
        'TI': /^\d{1,11}$/,  // Tarjeta de Identidad: Hasta 11 dígitos
        'PA': /^[A-Za-z0-9]{1,9}$/,  // Pasaporte: Hasta 9 caracteres alfanuméricos
        'RC': /^\d{1,11}$/,  // Registro Civil: Hasta 11 dígitos
        'PEP': /^PE[0-9]{8}$/,  // PEP: Empieza con PE y tiene 8 dígitos
        'SECUENCIAL': /^\d{1,20}$/  // Secuencial: Hasta 20 dígitos
    };

    // Obtiene el patrón según el tipo de documento
    const patron = patrones[tipoDocumento];

    // Si el tipo de documento no está definido, devolvemos false
    if (!patron) {
        return false;
    }

    // Comprobamos si el número de documento coincide con el patrón
    return patron.test(numeroDocumento);
}

// Ejemplos de uso
// console.log(validarDocumento('CC', '1234567890'));  // true
// console.log(validarDocumento('CE', '123456789012345'));  // true
// console.log(validarDocumento('NIT', '123456789-1'));  // true
// console.log(validarDocumento('TI', '12345678901'));  // true
// console.log(validarDocumento('PA', 'AB1234567'));  // true
// console.log(validarDocumento('PEP', 'PE12345678'));  // true
// console.log(validarDocumento('SECUENCIAL', '12345678901234567890'));  // true
// console.log(validarDocumento('SECUENCIAL', '12345'));  // true
// console.log(validarDocumento('SECUENCIAL', '123456789012345678901'));  // false (más de 20 dígitos)
