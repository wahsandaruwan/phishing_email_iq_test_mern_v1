// Element components
import SumBox from "./SumBox"

// Icons
import {BiBadgeCheck, BiBookmarks, BiTime} from "react-icons/bi"

const Summary = () => {
    return (
        <>
            <section className="summary">
                <SumBox title="Last Test Score" value="09" icon={<BiBookmarks/>}/>
                <SumBox title="Last Test Time" value="1 Min. 58 Sec." icon={<BiTime/>}/>
                <SumBox title="Number of Test Faced" value="05" icon={<BiBadgeCheck/>}/>
            </section>
        </>
    )
}

export default Summary
