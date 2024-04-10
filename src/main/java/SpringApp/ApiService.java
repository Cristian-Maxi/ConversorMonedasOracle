package SpringApp;

import com.google.gson.Gson;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class ApiService {

    public Double DevolverMoneda(String valor1, Double cantidad, String valor2) throws IOException, InterruptedException {
        String api = "https://v6.exchangerate-api.com/v6/a2477bc3a7ccc57d5556ce9f/latest/"+valor1;
        HttpClient cliente = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(api))
                .build();
        HttpResponse<String> response = cliente
                .send(request, HttpResponse.BodyHandlers.ofString());
        String json = response.body();
        
        Gson gson = new Gson();
        CambioMonedas cambio = gson.fromJson(json, CambioMonedas.class);
        
        Map<String, Double> conversion = cambio.getConversionRates();
        
        if (conversion.containsKey(valor1) && conversion.containsKey(valor2)) {
            Double PrimerValor = conversion.get(valor1);
            Double CantidadIngresada = cantidad; 
            Double SegundoValor = conversion.get(valor2);
            Double resultado = (PrimerValor * CantidadIngresada) * SegundoValor;
            return resultado;
        } else {
            throw new IllegalArgumentException("Moneda no encontrada: " + valor1);
        } 
    }
}
