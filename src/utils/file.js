import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

const uploadFile = async (file) => {
    //Luư cái file này lên firebase
    const storageRef = ref(storage, file.name);
    const response = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(response.ref);
    return downloadURL;
    //Lấy cái đường dẫn đến file vừa tạo
}

export default uploadFile;