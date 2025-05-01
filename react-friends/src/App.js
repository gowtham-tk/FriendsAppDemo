import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography, Layout, Menu, Button } from "antd";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if(storedUser) {
      setUser(storedUser);
    } else {
      setUser('');
    }
  },  [user]);

  function signout() {
    localStorage.setItem('user', '');
    setUser('');
    navigate("/login");
  }

  return (
    <div>
      <div>
            <nav className="bg-gray-100">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false"
                             onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg className="block size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                              <h2 class="mb-4 font-extrabold text-gray-900 dark:text-white"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Remember Friends App</span></h2>
                            </div>
                            <div className="hidden sm:flex ml-auto space-x-4 items-center">
                                <Link to="/" className="object-left text-gray-700 hover:text-blue-600">Home</Link>
                                { user === '' ? (
                                  <>
                                    <Link to="/login" className="object-left text-gray-700 hover:text-blue-600">Login</Link>
                                    <Link to="/register" className="object-left text-gray-700 hover:text-blue-600">Register</Link>
                                  </>
                                  ) : (
                                    <Button type="primary" danger onClick={signout}>Signout</Button>
                                  )
                                }
                            </div>

                        </div>
                    </div>

                </div>
                {menuOpen && (
                  <div className="sm:hidden" id="mobile-menu">
                          <div className="space-y-1 px-2 pt-2 pb-3">
                            <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
                            { user === '' ? (
                                  <>
                                    <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                                    <br></br>
                                    <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
                                  </>
                                  ) : (
                                    <>
                                    <br></br>
                                    <Button type="primary" danger onClick={signout}>Signout</Button>
                                    </>
                                  )
                                }
                          </div>
                        </div>

                    )}
            </nav>
        </div>
      <Layout>
        <Content style={{ padding : '0 50px'}}>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </Content>
      </Layout>
      </div>
  );
}

export default App;
