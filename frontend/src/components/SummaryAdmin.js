// Element components
import SumBox from "./SumBox"

// Icons
import {BiReset, BiUser, BiAbacus} from "react-icons/bi"

const SummaryAdmin = () => {
    return (
        <>
            <section className="summary">
                <SumBox title="Number of Users" value="25" icon={<BiUser/>}/>
                <SumBox title="Number of Tests" value="150" icon={<BiReset/>}/>
                <SumBox title="Number of Quizes" value="100" icon={<BiAbacus/>}/>
            </section>
        </>
    )
}

export default SummaryAdmin