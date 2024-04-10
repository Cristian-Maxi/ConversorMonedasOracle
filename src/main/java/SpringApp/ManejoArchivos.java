package SpringApp;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ManejoArchivos {

    public void crearArchivo(String nombreArchivo) {
        File archivo = new File(nombreArchivo);
        try {
            if (archivo.createNewFile()) {
                System.out.println("Archivo creado: " + archivo.getName());
            } else {
                System.out.println("El archivo ya existe.");
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public void escribirArchivo(String nombreArchivo, String contenido) {
        File archivo = new File(nombreArchivo);
        try {
            PrintWriter documento = new PrintWriter(archivo);
            documento.println(contenido);
            documento.close();
        } catch (FileNotFoundException ex) {
            ex.printStackTrace(System.out);
        }
    }

    public void anexarArchivo(String nombreArchivo, String contenido) {
        File archivo = new File(nombreArchivo);
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss yyyy-MM-dd");
        String fechaCreacion = sdf.format(new Date());
        try {
            PrintWriter documento = new PrintWriter(new FileWriter(archivo, true));
            documento.println("Fecha de consulta: " + fechaCreacion);
            documento.println(contenido);
            documento.println("-------------------------------------------------------------------------");
            documento.close();
        } catch (FileNotFoundException ex) {
            ex.printStackTrace(System.out);
        } catch (IOException ex) {
            ex.printStackTrace(System.out);
        }
    }

    public void leerArchivo(String nombreArchivo) {
        //File archivo = new File(nombreArchivo);
        var archivo = new File(nombreArchivo);
        try {
            //BufferedReader leer = new BufferedReader(new FileReader(archivo));
            var leer = new BufferedReader(new FileReader(archivo));
            var lectura = leer.readLine();
            while (lectura != null) {
                lectura = leer.readLine();
            }
            leer.close();
        } catch (FileNotFoundException ex) {
            ex.printStackTrace(System.out);
        } catch (IOException ex) {
            ex.printStackTrace(System.out);
        }
    }
}
