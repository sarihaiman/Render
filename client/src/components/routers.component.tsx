import { Route, Routes } from 'react-router-dom';
import SigninFormComponent from '../components/signIn.component.tsx';
import SignupFormComponent from '../components/signUp.component.tsx';
import OrderFormComponent from '../components/order.component.tsx';
import HomeComponent from '../components/home.component.tsx';
import ContactComponent from '../components/contact.component.tsx';
import ChatComponent from '../components/ChatBot/chatbot.components.tsx';
import GalleryComponent from '../components/gallery.component.tsx';
import UploadComponent from '../components/upload.component.tsx';
import { useSelector } from 'react-redux';
import Customers from '../components/Admin/customers.component.tsx';
import Orders from '../components/Admin/orders.component.tsx';
import PotographyPackage from '../components/Admin/potographyPackage.component.tsx';
import BusinessDetails from '../components/Admin/businessDetails.component.tsx';
import UploadShowComponent from '../components/Admin/showUpload.tsx';
import FeedbackComponent from './Admin/feedbackDiagrama.component.tsx';
import ImageComponent from './Admin/image.component.tsx';

const PublicRoutes = () => {
    const isAdmin: boolean = useSelector((state: any) => {
        return state.userReducer.currentUser.isAdmin;
    });

    return (
        <Routes>
            <Route path="/" element={<SigninFormComponent />} />
            <Route path="/signIn" element={<SigninFormComponent />} />
            <Route path="/signUp" element={<SignupFormComponent />} />
            <Route path="/Order" element={<OrderFormComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/contact" element={<ContactComponent />} />
            <Route path="/chat" element={<ChatComponent />} />
            <Route path="/gallery" element={<GalleryComponent />} />
            <Route path="/upload" element={<UploadComponent />} />
            {isAdmin && <Route path="/admin/customers" element={<Customers />} />}
            {isAdmin && <Route path="/admin/orders" element={<Orders />} />}
            {isAdmin && <Route path="/admin/potographyPackage" element={<PotographyPackage />} />}
            {isAdmin && <Route path="/admin/businessDetails" element={<BusinessDetails />} />}
            {isAdmin && <Route path="/admin/upload" element={<UploadShowComponent />} />}
            {isAdmin && <Route path="/admin/feedback" element={<FeedbackComponent />} />}
            {isAdmin && <Route path="/admin/image" element={<ImageComponent />} />}
        </Routes>
    );
};

export default PublicRoutes;