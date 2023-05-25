import Posts from "../../components/posts/Posts";
import { useStateContext } from "../../contexts/ContextProvider";
function Home() {
    return (
        <div className="flex flex-col gap-5 mt-5">
            <Posts/>
        </div>
    );
}

export default Home;