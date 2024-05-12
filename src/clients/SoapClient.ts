/**
 * Client SOAP per inviare richieste SOAP.
 * @param config Configurazione della richiesta.
 * @returns Una promessa con il risultato della richiesta.
 */
import {ApiRequestConfig, ApiResponse} from "../ApiModels";
import {saveToStore} from "../ApiUtils";
import {api} from "../Api";

export async function SoapClient<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    const {endpoint, method = 'POST', data = null, headers = {}, module = 'default', action} = config;

    // Valido l'URL del WSDL e l'azione
    if (!endpoint) {
        throw new Error('L\'URL del WSDL è richiesto per le richieste SOAP.');
    }
    if (!action) {
        throw new Error('L\'azione SOAP è richiesta per le richieste SOAP.');
    }

    // Imposto il tipo di contenuto per le richieste SOAP
    headers['Content-Type'] = 'text/xml; charset=utf-8';

    // Invio la richiesta con l'API Fetch
    const fetchOptions: RequestInit = {
        method,
        headers,
    };

    // Costruisco l'envelope SOAP se necessario
    if (data && method !== 'GET' && method !== 'HEAD') {
        const envelope = buildSoapEnvelope(data, action, endpoint);
        if (envelope) {
            fetchOptions.body = envelope;
        }
    }

    const fetchResponse = await fetch(endpoint, fetchOptions);

    if (!fetchResponse.ok) {
        throw new Error(`La richiesta SOAP è fallita con lo stato ${fetchResponse.status}`);
    }

    // Parso la risposta XML
    const parser = new DOMParser();
    const xmlDoc = await fetchResponse.text();
    // Estraggo i dati
    let responseData: any = parser.parseFromString(xmlDoc, 'text/xml');


    // Salva i dati nello store
    // TODO: da implementare

    return {
        data: responseData,
        status: fetchResponse.status,
        statusText: fetchResponse.statusText,
        headers: fetchResponse.headers,
        config,
    };
}

/**
 * Costruisce l'envelope SOAP per le richieste SOAP.
 * @param data Dati da inviare nell'envelope SOAP.
 * @param action Azione SOAP.
 * @param wsdl URL del WSDL.
 * @returns Envelope SOAP.
 */
function buildSoapEnvelope(data: any, action: string, wsdl: string): string | undefined {
    if (data && action && wsdl) {
        const envelope = `
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <soapenv:Header/>
    <soapenv:Body>
        <ns1:${action}>
            ${JSON.stringify(data)}
        </ns1:${action}>
    </soapenv:Body>
</soapenv:Envelope>`;

        // Sostituisco ns1 con il namespace effettivo del servizio
        return envelope.replace(/ns1:/g, `${wsdl.split('/')?.pop()?.split('.')[0]}:`);
    }
}
