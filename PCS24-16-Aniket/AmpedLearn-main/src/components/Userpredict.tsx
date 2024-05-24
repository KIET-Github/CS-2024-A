import Header from "components/Header";
import LangList from "components/LangList";
import Metric from "components/Metric";
import Plot from "components/Plot";
import { useGlobal } from "context";
import React ,{useState,useEffect} from "react";
import { clx } from "helpers";



const Userpredict = () => {
  const global = useGlobal();

  return (
    <div className="content11 bg-gradient-to-r from-emerald-500 from-25% via-sky-500 via-65% to-indigo-500 to-80% ...">
      <div className={clx("display", global.metricsAreExpanded && "yOptionsExpanded")}>
        <LangList />
        <Plot />
        <Metric />
    </div>
    </div>
  );
};

export default Userpredict;
