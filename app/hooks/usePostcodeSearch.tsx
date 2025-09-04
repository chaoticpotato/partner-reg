import { useState, useEffect } from "react";

export default function usePostcodeSearch(query: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!query || query.length < 1) {
      setSuggestions([]);
      return;
    }

    const searchPostcodes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.postcodes.io/postcodes/${encodeURIComponent(
            query
          )}/autocomplete`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch postcodes");
        }

        const data = await response.json();
        const trimmedData = data.result.map((pc: string) =>
          pc.replaceAll(" ", "")
        );
        setSuggestions(trimmedData || []);
      } catch (err) {
        setError(err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the search
    const timeoutId = setTimeout(searchPostcodes, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return { suggestions, loading, error };
}
