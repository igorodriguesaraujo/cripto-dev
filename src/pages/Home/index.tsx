import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircle, RefreshCcw, Search } from "lucide-react";
import { ICrypto } from "../../@types";

export function Home() {
  const [input, setInput] = React.useState("");
  const [offset, setOffset] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [criptos, setCriptos] = React.useState<ICrypto[]>([]);

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (input === "") return;

    navigate(`/detail/${input}`);
  }

  function handleMoreLoad() {
    if (offset === 0) {
      setOffset(10);
      return
    }

    setOffset(offset + 10);
  }

  const getCriptoData = useCallback(async () => {
    try {
      setIsLoading(true);

      const URL = `https://api.coincap.io/v2/assets?limit=10&offset=${offset}`;

      const response = await fetch(URL);
      const { data } = await response.json();

      const fomattedCurrency = new Intl.NumberFormat('US-en', {
        style: 'currency',
        currency: 'USD',
      });

      const fomattedCurrencyCompact = new Intl.NumberFormat('US-en', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
      });

      const formattedData: ICrypto[] = data.map((item: ICrypto) => ({
        ...item,
        formattedPrice: fomattedCurrency.format(Number(item.priceUsd)),
        formattedMarketCap: fomattedCurrencyCompact.format(Number(item.marketCapUsd)),
        formattedVolume: fomattedCurrencyCompact.format(Number(item.volumeUsd24Hr))
      }));

      setCriptos((prevState) => [...prevState, ...formattedData]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [offset]);

  React.useEffect(() => {
    getCriptoData();
  }, [offset, getCriptoData]);

  return (
    <div className="container max-w-[960px] mx-auto px-4">
      <form className="mb-6" onSubmit={handleSubmit}>
        <span className="flex bg-white rounded-md overflow-auto">
          <input
            type="text"
            value={input}
            placeholder="Buscar por cripto"
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 outline-0 text-gray-600  p-4"
          />
          <button
            type="submit"
            className="cursor-pointer bg-amber-300 hover:bg-amber-400 duration-300 p-4">
            <Search className="w-6 h-6 text-gray-800" />
          </button>
        </span>
      </form>

      <div className="w-full overflow-auto">
        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr>
              <th
                className="p-4"
                scope="col">
                Moeda
              </th>
              <th
                className="p-4"
                scope="col">
                Valor de Mercado
              </th>
              <th
                className="p-4"
                scope="col">
                Preço
              </th>
              <th
                className="p-4"
                scope="col">
                Volume
              </th>
              <th
                className="p-4"
                scope="col">
                Mudança 24h
              </th>
            </tr>
          </thead>

          <tbody>
            {criptos?.map(({
              id,
              symbol,
              name,
              formattedPrice,
              formattedMarketCap,
              formattedVolume,
              changePercent24Hr
            }, index) => (
              <tr key={index}>
                <td
                  className="rounded-tl-md rounded-bl-md bg-gray-700 p-4 text-start">
                  <div className="flex items-center gap-2">
                    <img
                      alt={name} className="w-6 h-6"
                      src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
                    />

                    <Link to={`/detail/${id}`} className="whitespace-nowrap">
                      <span>{name}</span>
                      <strong className="block text-xs">{symbol}</strong>
                    </Link>
                  </div>
                </td>
                <td className="bg-gray-700 p-4 text-center">
                  {formattedMarketCap}
                </td>
                <td className="bg-gray-700 p-4 text-center">
                  {formattedPrice}
                </td>
                <td className="bg-gray-700 p-4 text-center">
                  {formattedVolume}
                </td>
                <td className={`rounded-br-md rounded-tr-md bg-gray-700  font-bold p-4 text-center ${+changePercent24Hr < 0
                  ? 'text-red-500'
                  : 'text-green-500'}`}>
                  {Number(changePercent24Hr).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isLoading && (
        <div className="flex justify-center gap-2 items-center w-full h-20">
          <LoaderCircle className="animate-spin text-amber-400 text-center" />
          <span className="text-md">Carregando...</span>
        </div>
      )}

      {criptos.length !== 0 && (
        <footer className="flex justify-center items-center w-full h-20">
          <button
            type="button"
            className="flex items-center gap-2 bg-amber-300 text-gray-800 py-2 px-6 rounded-md font-bold cursor-pointer hover:bg-amber-400 duration-300"
            onClick={handleMoreLoad}>
            <RefreshCcw className="size-5" />
            <span>Carregar mais</span>
          </button>
        </footer>
      )}
    </div>
  )
}