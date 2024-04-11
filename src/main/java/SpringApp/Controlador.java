package SpringApp;

import java.io.IOException;
import java.text.DecimalFormat;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Controlador {

    //private final String nombreArchivo = "src\\main\\java\\SpringApp\\Historial.txt";
    private final String nombreArchivo = "Historial.txt";

    private ApiService apiService;
    private ManejoArchivos manejoArchivo = new ManejoArchivos();

    public Controlador(ApiService apiService) {
        this.apiService = apiService;
    }
    
    @GetMapping("/descargar")
    public ResponseEntity<Resource> DescargarArchivo() {
        manejoArchivo.leerArchivo(nombreArchivo);
        Resource archivo = new FileSystemResource(nombreArchivo);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + archivo.getFilename())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(archivo);
    }

    @GetMapping("/enviar")
    public String Conversor(@RequestParam String valor1, Double cantidad, String valor2) {
        try {
            Double moneda = apiService.DevolverMoneda(valor1, cantidad, valor2);
            DecimalFormat formato = new DecimalFormat("#.00");
            String respuesta = "Monto ingresado: " + cantidad + " " + valor1 + "\n"
                    + "Cambio esperado: " + formato.format(moneda) + " " + valor2;
            manejoArchivo.crearArchivo(nombreArchivo);
            manejoArchivo.anexarArchivo(nombreArchivo, respuesta);
            return respuesta;
        } catch (IOException | InterruptedException ex) {
            return "Mensaje de error: " + ex.getMessage();
        }
    }
}
