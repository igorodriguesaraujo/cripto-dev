import React from "react";
import { ArrowDown, ArrowLeft, ArrowUp, LoaderCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ICrypto } from "../../@types";

export function Details() {
  const { cripto } = useParams();

  const [isLoading, setIsLoading] = React.useState(false);
  const [criptoData, setCriptoData] = React.useState<ICrypto | null>(null);


  async function getCryptoById() {
    try {
      setIsLoading(true);

      const url = `https://api.coincap.io/v2/assets/${cripto}`;

      const response = await fetch(url);
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

      setCriptoData({
        ...data,
        formattedPrice: fomattedCurrency.format(Number(data.priceUsd)),
        formattedMarketCap: fomattedCurrencyCompact.format(Number(data.marketCapUsd)),
        formattedVolume: fomattedCurrencyCompact.format(Number(data.volumeUsd24Hr))
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    getCryptoById();
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center gap-2 items-center w-full h-20">
        <LoaderCircle className="animate-spin text-amber-400 text-center" />
        <span className="text-md">Carregando...</span>
      </div>
    )
  }

  return (
    <section className="container max-w-[960px] mx-auto px-4">
      <Link className="flex items-center gap-2 mb-8" to="/">
        <ArrowLeft className="w-4 h-4 text-gray-400 hover:text-gray-500" />
        <span className="font-bold">Voltar</span>
      </Link>

      <header className="flex items-center justify-between bg-gray-700 p-4 rounded-tl-2xl rounded-tr-2xl">
        <div className="flex gap-2 items-center">
          <img
            alt={criptoData?.id}
            className="w-12 h-12"
            src={`https://assets.coincap.io/assets/icons/${criptoData?.symbol?.toLowerCase()}@2x.png`}
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-light">{criptoData?.name}</h2>
            <span className="text-xs text-gray-400 font-bold">{criptoData?.symbol}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className={`flex flex-row-reverse justify-start items-center gap-2 text-2xl font-bold ${Number(criptoData?.changePercent24Hr) > 0
            ? 'text-emerald-400'
            : 'text-rose-600'}`}>
            {Number(criptoData?.changePercent24Hr) > 0
              ? <ArrowUp className="w-4 h-4" />
              : <ArrowDown className="w-4 h-4" />
            }
            <span>{Number(criptoData?.changePercent24Hr).toFixed(2)}%</span>
          </h3>
          <span className="text-gray-400 text-xs">Mudança 24h</span>
        </div>
      </header>

      <article className="flex flex-wrap justify-between gap-4 bg-gray-800 px-4 py-8 rounded-bl-2xl rounded-br-2xl">
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs">Valor de Mercado</span>
          <h3 className="text-xl md:text-3xl font-bold">{criptoData?.formattedMarketCap}</h3>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400 text-xs">Preço</span>
          <h3 className="text-xl md:text-3xl font-bold">{criptoData?.formattedPrice}</h3>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400 text-xs">Volume</span>
          <h3 className="text-xl md:text-3xl font-bold">{criptoData?.formattedVolume}</h3>
        </div>
      </article>
    </section>
  )
}