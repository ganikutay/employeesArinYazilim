import { useEffect, useState } from "react";

//EmployeeList'ten gonderilen <pagination /> daki proplari yakaliyoruz(pages ve setCurrentPage)
// COK ONEMLI BILGI const Pagination = ( {pages , setCurrentPage}) => {   buradaki ({pages, setCurrentPage}) 'kisminda ic kisimdaki süslu parantezler olmazsa PROGRAM CALISMIYOR!!!!!!
const Pagination = ( {pages , setCurrentPage, employees, currentEmployees}) => {

    //const pages = 5;

    const numOfPages = [];

    //her i durumunda 1 2 3 gibi siralandikca, array e yeni bir eleman eklensin istiyoruz.
    for(let i=1; i <= pages; i++) {
        numOfPages.push(i);
    }


    //sayfa butonlarinda varsayilan deger 1  (yani birinci sayfada baslatilacak)
    const [currentButton, setCurrentButton] = useState(1);


    useEffect(()=> {
        //calisir calismaz, o anki sayfayi, o butona cevirecek
        setCurrentPage(currentButton)
    }, [currentButton, setCurrentPage])


    return (
        <div className="clearfix">                           {/*  uzunlugu                        uzunlugu */}
            <div className="hint-text">Showing <b>{currentEmployees.length}</b> out of <b>{employees.length}</b> entries</div>
            <ul className="pagination">                                                       {/* href="#!"  unlem ekleyince hatadan kurtuluruz */}
                <li className={`${currentButton === 1 ? "page-item disabled" : "page-item"}`}><a href="#!" className="page-link"
                onClick = {() => setCurrentButton((prev) => prev === 1 ? prev : prev - 1)} //prev === 1 ? prev prev 1 e esitse prev döner. degil ise prev-1 , yani 1 azaltir
                >Previous</a></li>

                {//key hatasi almamak icin index i yerlestirdik.
                    numOfPages.map((page,index) => {

                    return(//currentButton hangi sayfaya esitse o sayfa active olarak gozukecek.
                        <li key={index} className={`${currentButton === page ? "page-item active" : "page-item"}`}><a href="#!" className="page-link"
                        onClick = {() => setCurrentButton(page)} // hangi sayfaya tiklarsak(numara olarak) oraya gitmesini istiyoruz
                        
                        >{page}</a></li>
                    )
                    })
                }

                                                    {/* sayfa sayimizin uzunlugu */} 
                <li className={`${currentButton === numOfPages.length ? "page-item disabled" : "page-item"}`}><a href="#!" className="page-link"
                onClick = {() => setCurrentButton((next) => next === numOfPages.length ? next : next + 1)} //next === numOfPages.length ? next next sayfasayisina e esitse next döner. degil ise next+1 , yani 1 arttirir
                >Next</a></li>

            </ul>
        </div>
    )
}


export default Pagination;




/* <li className="page-item"><a href="#" className="page-link">1</a></li>

                <li className="page-item"><a href="#" className="page-link">2</a></li>

                <li className="page-item active"><a href="#" className="page-link">3</a></li>

                <li className="page-item"><a href="#" className="page-link">4</a></li>
                <li className="page-item"><a href="#" className="page-link">5</a></li>

                 */