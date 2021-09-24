//hookslarda artik import react yapmiyoruz.
//import { useState } from "react"; veriyi aldigimiz icin artik use state kullanmamiza gerek kalmadi,artikEmployeeContext te import ediyoruz      // hookslarda useState kullanacagimiz icin, import ettik 
import Employee from "./Employee";
import { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";
import { Button, Modal, Alert } from "react-bootstrap";
import AddForm from "./AddForm";
import Pagination from "./Pagination"

const EmployeeList = () => {

    //direkt kendisinin kullanacagi contexti soyluyoruz.
    const { employees } = useContext(EmployeeContext)    //yani, EmployeeContext'ten gelen employees i cekmis oluyoruz.

    /* ESKIDEN , CLASS COMPONENT I KULLANIRKEN STATE I BOYLE GOSTERIYORDUK.
     state = {
        employees = [
            {employee 1}
            {employee 1}
            {employee 1}
        ]
    } */



    const [showAlert, setShowAlert] = useState(false);
    //
    //                     useState(false) yani baslangicta modal i gosterme, tiklaninca goster diyoruz
    //Yani suan Show un varsyilan degeri FALSE! gostermesini henuz istemiyoruz.
    //Asagida Modal a show ozelligi atadik ve buradaki show degerini de o ozellige atadik. Yani false olursa gostermez, true olursa gosterir.
    const [show, setShow] = useState(false)

    //sayfamizin baslangic degeri 1 idi
    const [currentPage, setCurrentPage] = useState(1);

//sayfada kac adet calisan gosterilmesini istiyoruz onu belirtiyoruz
    const [employeesPerPage] = useState(2); //sayfa basina 2 calisan gosteriyor


    // Biz burada Modal in gosterilip gosterilmemesini state olarak tanimladik. State sadece icerisinde bilgi tutma ozelligi tasimiyor, cok daha fazlasi..
    const handleClose = () => setShow(false) //show degerini false yapmaya yariyor
    const handleShow = () => setShow(true)   //show degerini true yapmaya yariyor
    //1. baslangic degeri, 2. ise o baslangic degerini degistirecek olan islemdir. 1. show du , 2. de setShow

    //Alertimizi gosteren foksityonna ait bilgiler
    const handleShowAlert = () => setShowAlert(true)

    //employees'de herhangi bir degisiklik olursa, handleClose() fonksiyonunu calistir.
    //render ediliyor. refresh edilmiyor!
    //Ayrica useEffect BASLANGICTA DA CALISIR!!! yani sayfayi acar acmaz bu metot calisacaktir.
    useEffect(() => {
        handleClose();

        return () => {
            handleShowAlert();

            //2 saniye sonra alertin kapanmasi icin
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }

    }, [employees])
    //eger employes yerine bos bi array biraksaydik, sadece baslangicta calisacakti ve bir daha calismayacakti. yada arrayi tamamen silersek, her degisimde calisacakti.


    /* ------useEffect()----- birden fazla kullanimda, varsayilan sirayla calisir..
    useEffect(() => {
        //alert("ACILDI");
    //buradaki kisim, sayfa acilir acilmaz calisiyor. return kismi ise sadece employees de degisiklik yapinca calisir.
        return () => {
        handleClose();
        alert("YUKLEME TAMAMLANDI");
        }
    }, [employees]) */





    //useRef tekrardan RENDER ETMEZ, EN ONEMLI OZELLIGI BUDUR
    //baslangic degerinin herhangi bisey olmasini istemedigimiz icin null yazdik. Eger null yazmasaydik, baslangic degeri undifened olurdu.
    //const myRef = useRef(null);

    //const onButtonClick = () => {
    //currentla yakaliyoruz(myRef'i)
    //myRef e focus olmasini istiyoruz
    //    myRef.current.focus();
    //}


//ilk calisan ve son calisan icin bi index olusturuluyo, aradaki sayfalari bulabilmesi icin
const indexOfLastEmployee = currentPage * employeesPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
const totalPagesNum = (Math.ceil(employees.length / employeesPerPage));
                   // calisan uzunlugu bolu sayfada gostermek istedigimiz kisi sayisi = toplam sayfa sayisi

    return (



        //<> ,  </> hiyerarjik problemini duzeltmesi icin react fragment yerlestiriliyor.
        <>
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Manage <b>Employees</b></h2>
                    </div>
                    <div className="col-sm-6">
                        <Button onClick={handleShow} className="btn btn-success text-white" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></Button>
                    </div>
                </div>
            </div>

            {/* Alert, react-bootstrap kutuphanesinden cekildi */}
            {/* show={showAlert} , showAlert in durumuna gore false veya true gelecek. */}
            <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
                Employee List Successfully Updated!
            </Alert>



            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //.sort((a,b) => a.name.localeCompare(b.name))    ile isme gore siralama yaptik VEYA 
                        //.sort((a,b) => a.name < b.name ? -1 : 1        yani a kucukse derken, daha once basliyorsa demek istiyoruz(a, b den once gelir) kisaca b buyukse a dan z ye.dedik burada
                        currentEmployees./* sort((a, b) => a.name.localeCompare(b.name)). */map((employee) => (
                            //sort burada olursa, siralama her sayfada ayri ayri oluyor.
                            <tr key={employee.id}>
                                <Employee employee={employee} />
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {/* ---------------SAYFA SIRASI---------------------- */}

            <Pagination 
            pages={totalPagesNum} 
            setCurrentPage={setCurrentPage} 
            currentEmployees={currentEmployees}
            employees={employees}
            />

            {/* ------------------ACILIR KAPANIR MODAL------------------------- */}

            {/* AddForm u asagida yazdik */}
            {/* Modal in sol kismindaki show, bir özelliktir, degisken olan sagdakidir. */}
            {/* onHide, cercever disarisinda bi yere basinca kapatmasi icin, o da formu kapatma func calistiracak */}
            <Modal show={show} onHide={handleClose}>
                {/* Sag ust koseye carpi isareti ile kapatma secenegi ekledik modal-header ve closeButton ile */}
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>
                        Add Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddForm />
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">
                        Close Modal
                    </Button>
                </Modal.Footer> */}
                
            </Modal>


            {/* input elemanina referanf verdik. ref={myRef}  .. senin referansin myRef dedik */}
            {/* <input ref={myRef} type="text"></input>
            <button onClick={onButtonClick}>Focus Input</button>  */}
        </>
    )
}

export default EmployeeList;