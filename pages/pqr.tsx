import Link from "next/link"

function pqr() {
    return (
        <><h1>PETICIONES, QUEJAS Y RECLAMOS</h1><ul>
            <li>
                <a href="/">Peticiones</a>
            </li>
            <li>
                <a href="/">Quejas</a>
            </li>
            <li>
                <Link href="/claims"><a>Reclamos</a></Link>
            </li>
        </ul></>
    )
}

export default pqr