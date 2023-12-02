import React from "react"
import { Container, Row } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import Signin from "./Signin";
import Inbox from "./Inbox";
import NotFound from "./NotFound";
import Banner from './Banner/Banner';
import { Routes, Route,  Navigate } from 'react-router-dom';
import PrivateRoutes from "./UtilComponents/PrivateRoutes";
import Compose from "./Compose";
import UpdateProfile from './UpdateProfile';
import ViewEmail from "./ViewEmail";

function App() {
  return (
    <>
          <Container fluid
          style={({minHeight:"100vh"})}>
            <Row>
              <Banner></Banner>
            </Row>
                  <AuthProvider>
                    <Routes>
                      <Route path='/login' element={<Signin/>} />
                      <Route path='/signup' element={<Signup/>} />
                      <Route element={<PrivateRoutes/>}>
                        <Route path="/update-profile" component={<UpdateProfile/>} />
                        <Route path="/" element={<Navigate to="/inbox" replace />} />
                        <Route path="/inbox" element={<Inbox />} />
                        <Route path="/compose" element={<Compose/>} />
                        <Route path='/view/:id' element={<ViewEmail/>} />
                      </Route >
                        <Route path='*' element={<NotFound/>} />
                    </Routes>
                  </AuthProvider>
          </Container>
    </>
  );
}

export default App;
