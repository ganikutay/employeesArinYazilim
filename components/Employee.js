//hookslarda artik import react yapmiyoruz.
import { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";
//import EmployeeList from "./EmployeeList";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditForm from "./EditForm";

// EmployeeListten yakaliyoruz, employees props'umuzu. ve parametremize aktardik
const Employee = ({ employee }) => {


    //EmployeeContext ten,deleteEmployee yi cekiyoruz
    const { deleteEmployee } = useContext(EmployeeContext)

    //EmployeeContext ten,updateEmployee yi cekiyoruz
    //const { updateEmployee } = useContext(EmployeeContext)



    const [show, setShow] = useState(false)
    // Biz burada Modal in gosterilip gosterilmemesini state olarak tanimladik. State sadece icerisinde bilgi tutma ozelligi tasimiyor, cok daha fazlasi..
    const handleClose = () => setShow(false) //show degerini false yapmaya yariyor
    const handleShow = () => setShow(true)   //show degerini true yapmaya yariyor
    //1. baslangic degeri, 2. ise o baslangic degerini degistirecek olan islemdir. 1. show du , 2. de setShow



    //EDIT FORM DAN SONRA KAPANMA.
    useEffect(() => {
        handleClose();
    }, [employee])


    return (

        //employees propsundan gelen arrayimizi map metodu ile birer birer döndürduk. ve employee leri tek tek yazdikdik.
        //react.fragment <> </> isaretleri koymadigimizda <tr> den oturu hata veriyor
        <>

            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.address}</td>
            <td>{employee.phone}</td>
            <td>
               {/*  ----------------------------------------TOOLTIP--------------------------------------- */}
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top `}>
                            Edit
                        </Tooltip>
                    }>
                    <button onClick={handleShow} className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons"  >&#xE254;</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top `}>
                            Delete
                        </Tooltip>
                    }>
                    <button onClick={() => deleteEmployee(employee.id)} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons" >&#xE872;</i></button>
                </OverlayTrigger>
            </td>


            {/*   */}
            {/* EditForm u asagida yazdik */}
            {/* Modal in sol kismindaki show, bir özelliktir, degisken olan sagdakidir. */}
            {/* onHide, cercever disarisinda bi yere basinca kapatmasi icin, o da formu kapatma func calistiracak */}
            <Modal show={show} onHide={handleClose} >
                {/* Sag ust koseye carpi isareti ile kpatma secenegi ekledik modal-header ve closeButton ile */}
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>
                        Update Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* 9. satirdaki employee den bahsediyoruz. onu yakaladik ve EditFrom a gondericez, bunu gondermemiz gerekiyordu cunku hangi calisani editlemek istiyoruz bunu anlamamiz gerekiyordu. */}
                    <EditForm theEmployee={employee} />
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">
                        Close Modal
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>


    )
}

export default Employee;