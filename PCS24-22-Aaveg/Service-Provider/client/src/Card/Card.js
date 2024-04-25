import Page from "./Page";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div>
      <div className="">
        <hr class="h-px my-8 bg-gray-200 border-1 dark:bg-gray-700" />
        <h3
          className=" text-5xl font-extrabold text-center m-8 text-gray-900"
          style={{ fontFamily: "Bruno Ace" }}
        >
          {props.type}
        </h3>
        <ul className=" flex flex-wrap justify-center">
          {Page.map((e) => {
            return props.type === e.type ? (
              <article className="card m-3">
                <img
                  className="card__background"
                  style={{ width: "300px" }}
                  src={"./Images/" + e.imgproname + ".jpg"}
                  alt={e.imgproname}
                />
                <div className="card__content | flow">
                  <div className="card__content--container | flow">
                    <h5 className=" text-3xl font-extrabold text-white">
                      {e.proname}
                    </h5>
                  </div>
                  <Link to={"/Service?" + e.proname}>
                    <button className="card__button">Check</button>
                  </Link>
                </div>
              </article>
            ) : (
              ""
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Card;
