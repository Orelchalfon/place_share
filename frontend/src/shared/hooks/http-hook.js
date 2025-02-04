import { useCallback, useRef, useState, useEffect } from 'react';
const useHttpClient = () =>
{

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const activeHttpRequests = useRef([]);

  /**
   * Sends an HTTP request using the Fetch API.
   *
   * @function
   * @param {string} url - The URL to send the request to.
   * @param {string} [method='GET'] - The HTTP method to use (e.g., 'GET', 'POST').
   * @param {Object} [body=null] - The body of the request, typically used with 'POST' or 'PUT' requests.
   * @param {Object} [headers={}] - The headers to include in the request.
   * @returns {Promise<Object>} The response data as a JSON object.
   * @throws {Error} If the response is not ok or if there is a network error.
   */
  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) =>
  {
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal
      });

      const responseData = await response.json();
      activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      return responseData;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }


  }, []);
  
  const clearError = () =>
  {
    setError(null);
  }

  useEffect(() =>
  {
    return () =>
    {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
}
export default useHttpClient