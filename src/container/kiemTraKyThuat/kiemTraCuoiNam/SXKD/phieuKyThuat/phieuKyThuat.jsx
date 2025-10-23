import { FC, Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap";
import Pageheader from "../../../../../components/pageheader/pageheader";
import { donVidata } from "../../../kiemTraQuyIII/danhMuc/dinhMuc/dinhMucData";
import { CheckBox } from "@mui/icons-material";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwZM002-mVfsGaQeGlEt9qLnTK4Ef41VWhDFHlAeuH6XF_Xo9Lsiv194etMJCpzNbhiwA/exec"; // URL web app của bạn
const TOKEN = "vxphat1994@";

const YEARS = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const PhieuKyThuat = () => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [nam, setNam] = useState("");
  const [maDonVi, setMaDonVi] = useState("");
  const [tenLo, setTenLo] = useState("");
  const [kqktData, setKqktData] = useState([]);
  const [filteredLo, setFilteredLo] = useState([]);

  async function loadKQKT() {
    setLoading(true);
    try {
      const url = new URL(API_URL);
      url.searchParams.set("token", TOKEN);
      console.log("Fetching:", url.toString());
      const res = await fetch(url.toString(), { method: "GET" });
      const json = await res.json();
      setKqktData(json.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadKQKT();
  }, []);

  useEffect(() => {
    console.log("Filtering data:", { nam, maDonVi, kqktData });
    if (nam && maDonVi) {
      const filteredData = kqktData.filter(
        (item) => item.nam.toString() === nam && item.doi === maDonVi
      );
      console.log("Filtered data:", filteredData);
      const uniqueLo = [...new Set(filteredData.map((item) => item.tenlo))];
      console.log("Unique lots:", uniqueLo); // Log unique lots
      setFilteredLo(uniqueLo);
      console.log("Filtered lots state updated:", filteredLo); // Log the updated state
    } else {
      setFilteredLo([]);
    }
    setTenLo(""); // Reset tenLo when nam or maDonVi changes
  }, [nam, maDonVi, kqktData]);

  const printTable = () => {
    // if (dataLo.length === 0) {
    //   alert("Không có dữ liệu để in!");
    //   return;
    // }

    const printWindow = window.open("", "_blank");
    const tableElement = document.getElementById("bangNhap");

    if (!tableElement) {
      alert("Không tìm thấy bảng dữ liệu!");
      return;
    }

    // Clone the table to avoid modifying the original
    const tableClone = tableElement.cloneNode(true);

    // Create print-friendly HTML
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

        <title>Phiếu dã ngoại</title>
        <style>
          body {
            font-family: "Times New Roman", Times, serif;
            margin: 2px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 16px;
          }
          th, td {
            border: 1px solid #000;
            padding: 6px;
            text-align: center;
            vertical-align: middle;
          }
          th {
            background-color: #f0f0f0;
            font-weight: bold;
          }
          .table-active {
            font-weight: bold;
            background-color: #f1f1f1;
          }
          .text-wrap {
            white-space: normal !important;
          }
          @media print {
            body { 
            margin: 0 50px; 
            zoom: 0.67;   /* thu nhỏ 67% */
            transform-origin: top left; /* neo góc trái trên, tránh lệch trang */
            }
            table { page-break-inside: auto; }
            tr { page-break-inside: avoid; page-break-after: auto; }
            @page {
               size: A4 portrait; /* hoặc landscape nếu bạn cần ngang */
              margin: 30px 0;         /* để không bị cắt khi scale */
            }
          }
        </style>
      </head>
      <body>
      <div id="page-box"></div>

      <div id="content-wrapper">
          <div id="header-block">
              <p><b>TỔNG CÔNG TY CAO SU ĐỒNG NAI</b></p>
              <p><b>Đội:</b> ${
                maDonVi &&
                ` ${donVidata
                  .find((dv) => dv.maDonVi === maDonVi)
                  ?.donVi.toLocaleUpperCase()}`
              }</p>
              <p><b>Ngày kiểm tra: </b> ${new Date().toLocaleDateString(
                "vi-VN"
              )}</p>
          </div>

          <h4 style="text-align: center; margin-bottom: 20px; font-weight: 600">
            PHIẾU KIỂM TRA DÃ NGOẠI VƯỜN CÂY KTCB NĂM 2
           
          </h4>

          <div id="table-block">
            ${tableClone.outerHTML}
          </div>

          <div id="legend-block" style="display: grid; grid-template-columns: auto auto auto; justify-content:  center; margin-top: 10px">
            <p style="text-align: center; display: flex; align-items: center; justify-content: center;"><i class="bi bi-arrow-down-right"></i></p>
            <p style="border: 1px solid #000; padding: 10px 30px; text-align: center; margin-bottom: 0">Trước</p>
            <p style="text-align: center; display: flex; align-items: center; justify-content: center;"><i class="bi bi-arrow-down-left"></i></p>
            <p style="border: 1px solid #000; padding: 10px 30px; text-align: center; margin: 0">Trái</p>
            <p style="border: 1px solid #000; padding: 10px 30px; text-align: center; margin: 0">Lô</p>
            <p style="border: 1px solid #000; padding: 10px 30px; text-align: center; margin: 0">Phải</p>
            <p style="text-align: center; margin: 0; display: flex; align-items: center; justify-content: center;"><i class="bi bi-arrow-up-right"></i></p>
            <p style="border: 1px solid #000; padding: 10px 30px; text-align: center; margin: 0">Sau</p>
            <p style="text-align: center; margin: 0; display: flex; align-items: center; justify-content: center;"><i class="bi bi-arrow-up-left"></i></p>
          </div>

          <div id="sign-block" style="display: flex; flex-direction: row; justify-content: space-around; margin-top: 10px">
            <p style="text-align: right; margin-top: 10px; font-weight: bold; font-size: 20px">
              ĐẠI DIỆN ĐỘI
            </p>
            <p style="text-align: right; margin-top: 10px; font-weight: bold; font-size: 20px">
              NGƯỜI KIỂM TRA
            </p>
          </div>
      </div>
        
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for content to load before printing
    printWindow.onload = function () {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <Fragment>
      {/* <Pageheader title="Phiếu Dã Ngoại" heading="Tables" active="Tables" /> */}
      <Row className="mt-3">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>PHIẾU KIỂM TRA KỸ THUẬT</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col xl={2} lg={6} md={6} sm={12}>
                  <Form.Select
                    aria-label="Chọn năm"
                    value={nam}
                    onChange={(e) => setNam(e.target.value)}>
                    <option value="">Chọn năm</option>
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col xl={2} lg={6} md={6} sm={12}>
                  <Form.Select
                    aria-label="Chọn đơn vị"
                    value={maDonVi}
                    onChange={(e) => setMaDonVi(e.target.value)}>
                    <option value="">Chọn đơn vị</option>
                    {donVidata.map((dv) => (
                      <option key={dv.id} value={dv.maDonVi}>
                        {dv.maDonVi} - {dv.donVi}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xl={2} lg={6} md={6} sm={12}>
                  <Form.Select
                    aria-label="Chọn lô"
                    value={tenLo}
                    onChange={(e) => setTenLo(e.target.value)}
                    disabled={!nam || !maDonVi}>
                    <option value="">Chọn lô</option>
                    {filteredLo.map((lo, index) => (
                      <option key={index} value={lo}>
                        {lo}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xl={4} lg={6} md={6} sm={12} className="d-flex gap-3">
                  <Button
                    className="btn btn-primary label-btn"
                    onClick={() => loadKQKT(keyword)}
                    disabled={loading}>
                    <i className="bi bi-search label-btn-icon me-2"></i>
                    {loading ? "Đang tải..." : "Tìm kiếm"}
                  </Button>
                  <Button
                    className="btn btn-success label-btn"
                    onClick={printTable}>
                    <i className="bi bi-printer label-btn-icon me-2"></i>
                    In phiếu
                  </Button>
                </Col>
              </Row>

              <div className="d-flex justify-content-center mt-5">
                <h4>BẢNG KIỂM TRA KỸ THUẬT VƯỜN CÂY KHAI THÁC NĂM 2025</h4>
              </div>

              <div className="table-responsive mt-4 d-flex justify-content-center">
                <Table className="table" id="bangNhap">
                  <thead>
                    <tr>
                      <th
                        rowspan={5}
                        className="border border-dark text-center"
                        width="70px">
                        <b>Số thứ tự</b>
                      </th>
                      <th
                        rowspan={5}
                        class="text-wrap border border-dark text-center text-middle">
                        <b>Tên CN</b>
                      </th>
                      <th
                        rowspan={5}
                        class="text-wrap border border-dark text-center text-middle">
                        <b>Vỏ cạo</b>
                      </th>
                    </tr>
                    <tr>
                      <th
                        colspan={2}
                        className="text-center text-wrap border border-dark">
                        Cạn
                      </th>
                      <th
                        colspan={2}
                        className="text-center text-wrap border border-dark">
                        Phạm
                      </th>
                      <th
                        colspan={2}
                        className="text-center text-wrap border border-dark">
                        Hao dăm
                      </th>
                      <th
                        colspan={3}
                        className="text-center text-wrap border border-dark">
                        Miệng cạo
                      </th>
                      <th
                        rowspan={2}
                        class="text-wrap border border-dark text-center text-middle">
                        <b>Trang bị, chăm sóc cây cạo kém</b>
                      </th>
                      <th
                        rowspan={2}
                        class="text-wrap border border-dark text-center text-middle">
                        <b>Vệ sinh kém</b>
                      </th>
                      <th
                        rowspan={2}
                        class="text-wrap border border-dark text-center text-middle">
                        <b>Tận thu kém</b>
                      </th>
                      <th
                        rowspan={2}
                        class="text-wrap border border-dark text-center text-middle">
                        <b>Cây bỏ cạo (1 cây)</b>
                      </th>
                      <th
                        rowspan={2}
                        class="text-wrap border border-dark text-center text-middle">
                        <b>Trang bị dụng cụ CN không đầy đủ</b>
                      </th>
                      <th
                        rowspan={2}
                        class="text-wrap border border-dark text-center text-middle">
                        <b>Lấn bảng cạo</b>
                      </th>
                      <th
                        rowspan={4}
                        class="text-wrap border border-dark text-center text-middle"
                        width="80px">
                        <b>Lỗi khác</b>
                      </th>
                      <th
                        rowspan={4}
                        class="text-wrap border border-dark text-center text-middle"
                        width="80px">
                        <b>Tổng điểm lỗi</b>
                      </th>
                      <th
                        rowspan={4}
                        class="text-wrap border border-dark text-center text-middle"
                        width="80px">
                        <b>Phân hạng ban đầu</b>
                      </th>
                      <th
                        rowspan={4}
                        class="text-wrap border border-dark text-center text-middle"
                        width="80px">
                        <b>Giáng cấp</b>
                      </th>
                      <th
                        rowspan={4}
                        class="text-wrap border border-dark text-center text-middle"
                        width="80px">
                        <b>Phân hạng lại</b>
                      </th>
                    </tr>

                    <tr>
                      <th
                        className="border border-dark text-center"
                        width="100px">
                        Nhẹ
                      </th>
                      <th
                        className="border border-dark text-center"
                        width="100px">
                        Nặng
                      </th>
                      <th
                        className="border border-dark text-center"
                        width="100px">
                        Nhẹ
                      </th>
                      <th
                        className="border border-dark text-center"
                        width="100px">
                        Nặng
                      </th>
                      <th
                        className="border border-dark text-center"
                        width="100px">
                        Nhẹ
                      </th>
                      <th
                        className="border border-dark text-center"
                        width="100px">
                        Nặng
                      </th>
                      <th
                        className="border border-dark text-center"
                        width="100px">
                        Gợn sóng
                      </th>
                      <th
                        className="border border-dark text-center"
                        width="100px">
                        Lệch
                      </th>
                      <th
                        className="border border-dark text-center"
                        width="100px">
                        Không vuông góc
                      </th>
                    </tr>
                    <tr>
                      <td className="border border-dark" width="100px">
                        Cây 1
                      </td>
                      <td className="border border-dark" width="100px">
                        Cây 2
                      </td>
                      <td className="border border-dark" width="100px">
                        Cây 3
                      </td>
                      <td className="border border-dark" width="100px">
                        Cây 4
                      </td>
                      <td className="border border-dark" width="100px">
                        Cây 5
                      </td>
                      <td className="border border-dark" width="100px">
                        A
                      </td>
                      <td className="border border-dark" width="100px">
                        B
                      </td>
                      <td className="border border-dark" width="100px">
                        C
                      </td>
                      <td className="border border-dark" width="100px">
                        %
                      </td>
                      <td className="border border-dark" width="100px">
                        %
                      </td>
                      <td className="border border-dark" width="100px">
                        %
                      </td>
                      <td className="border border-dark" width="100px">
                        %
                      </td>
                      <td className="border border-dark" width="100px">
                        %
                      </td>
                      <td className="border border-dark" width="100px">
                        %
                      </td>
                      <td className="border border-dark" width="100px">
                        %
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-dark" width="60px">
                        (0.5)
                      </td>
                      <td className="border border-dark" width="60px">
                        (1.0)
                      </td>
                      <td className="border border-dark" width="60px">
                        (1.5)
                      </td>
                      <td className="border border-dark" width="60px">
                        (2.0)
                      </td>
                      <td className="border border-dark" width="60px">
                        (1.0)
                      </td>
                      <td className="border border-dark" width="60px">
                        (0.5)
                      </td>
                      <td className="border border-dark" width="60px">
                        (1.0)
                      </td>
                      <td className="border border-dark" width="60px">
                        (1.5)
                      </td>
                      <td className="border border-dark" width="60px">
                        (1.0)
                      </td>
                      <td className="border border-dark" width="60px">
                        (2.0)
                      </td>
                      <td className="border border-dark" width="60px">
                        (1.0)
                      </td>
                      <td className="border border-dark" width="60px">
                        (2.0)
                      </td>
                      <td className="border border-dark" width="60px">
                        (1.0)
                      </td>
                      <td className="border border-dark" width="60px">
                        (1.0)
                      </td>
                      <td className="border border-dark" width="60px">
                        (2.0)
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 20 }, (_, i) => (
                      <tr key={i}>
                        <td className="text-center border border-dark">
                          {i + 1}
                        </td>
                        <td className="text-center border border-dark">50</td>
                        <td className="text-center border border-dark">100</td>
                        <td className="text-center border border-dark">35</td>
                        <td className="text-center border border-dark">40</td>
                        <td className="text-center border border-dark">45</td>
                        <td className="text-center border border-dark">50</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                        <td className="text-center border border-dark">5</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="text-center border fw-bold border-dark bg-light">
                        <b>Vanh BQ</b>
                      </td>
                      <td className="text-center border fw-bold border-dark bg-light">
                        123
                      </td>
                      <td
                        className="text-center border fw-bold border-dark bg-light"
                        colSpan={2}>
                        Số cây đạt vanh
                      </td>
                      <td className="text-center border fw-bold border-dark bg-light">
                        50
                      </td>
                      <td className="text-center border fw-bold border-dark bg-light">
                        Độ lệch
                      </td>
                      <td className="text-center border fw-bold border-dark bg-light">
                        2.0
                      </td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                      <td className="text-center border fw-bold border-dark bg-light"></td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="comment">
                <Row className="mt-3">
                  <Col xl={4} className="text-start">
                    <b>1. Tỉa chồi có kiểm soát:</b>
                  </Col>
                  <Col xl={4} className="text-start">
                    <Form.Check
                      className="form-check-xl d-flex align-items-center me-3"
                      type="checkbox"
                      defaultChecked
                      id="checkebox-md"
                      label=" Đúng"
                    />
                  </Col>
                  <Col xl={4} className="text-start">
                    <Form.Check
                      className="form-check-xl d-flex align-items-center me-3"
                      type="checkbox"
                      defaultChecked
                      id="checkebox-md"
                      label=" Sai"
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col xl={4} className="text-start">
                    <b>2. Quản lý cỏ dại trên đường luồng:</b>
                  </Col>
                  <Col xl={4} className="text-start">
                    <Form.Check
                      className="form-check-xl d-flex align-items-center me-3"
                      type="checkbox"
                      defaultChecked
                      id="checkebox-md"
                      label=" Đúng"
                    />
                  </Col>
                  <Col xl={4} className="text-start">
                    <Form.Check
                      className="form-check-xl d-flex align-items-center me-3"
                      type="checkbox"
                      defaultChecked
                      id="checkebox-md"
                      label=" Sai"
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col xl={4} className="text-start">
                    <b>3. Quản lý cỏ dại trên đường băng:</b>
                  </Col>
                  <Col xl={4} className="text-start">
                    <Form.Check
                      className="form-check-xl d-flex align-items-center me-3"
                      type="checkbox"
                      defaultChecked
                      id="checkebox-md"
                      label=" Đúng"
                    />
                  </Col>
                  <Col xl={4} className="text-start">
                    <Form.Check
                      className="form-check-xl d-flex align-items-center me-3"
                      type="checkbox"
                      defaultChecked
                      id="checkebox-md"
                      label=" Sai"
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col xl={4} className="text-start">
                    <b>4. Cày ép xanh (Khoảng cách, kỹ thuật cày):</b>
                  </Col>
                  <Col xl={4} className="text-start">
                    <Form.Check
                      className="form-check-xl d-flex align-items-center me-3"
                      type="checkbox"
                      defaultChecked
                      id="checkebox-md"
                      label=" Đúng"
                    />
                  </Col>
                  <Col xl={4} className="text-start">
                    <Form.Check
                      className="form-check-xl d-flex align-items-center me-3"
                      type="checkbox"
                      defaultChecked
                      id="checkebox-md"
                      label=" Sai"
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col xl={4} className="text-start">
                    <b>5. Quản lý thảm phủ:</b>
                  </Col>
                  <Col xl={4} className="text-start">
                    <Form.Check
                      className="form-check-xl d-flex align-items-center me-3"
                      type="checkbox"
                      defaultChecked
                      id="checkebox-md"
                      label=" Cỏ dại"
                    />
                  </Col>
                  <Col xl={4} className="text-start">
                    <Form.Check
                      className="form-check-xl d-flex align-items-center me-3"
                      type="checkbox"
                      defaultChecked
                      id="checkebox-md"
                      label="Leo lên cây cao su"
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xl={4} className="text-start">
                    <b>6. Quản lý gia súc phá hoại:</b>
                  </Col>
                  <Col xl={4} className="text-start">
                    <Form.Check
                      className="form-check-xl d-flex align-items-center me-3"
                      type="checkbox"
                      defaultChecked
                      id="checkebox-md"
                      label="Có"
                    />
                  </Col>
                  <Col xl={4} className="text-start">
                    <Form.Check
                      className="form-check-xl d-flex align-items-center me-3"
                      type="checkbox"
                      defaultChecked
                      id="checkebox-xl"
                      label="Không"
                    />
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CSS tùy chỉnh */}
      <style jsx>{`
        .table-responsive {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          max-height: 660px;
          overflow-y: auto;
        }

        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 10; /* Đảm bảo tiêu đề nằm trên nội dung bảng */
          background-color: inherit; /* Giữ màu nền của tiêu đề */
        }

        .table th.text-wrap,
        .table td {
          white-space: normal !important;
          padding: 8px;
          vertical-align: middle;
          text-align: center;
        }
        .table th.col-HTPC {
          width: 100px;
        }
        .table th.col-tenCN {
          width: 200px;
        }
        .table th.col-maCN {
          width: 120px;
        }

        .table tr.table-active {
          font-weight: bold;
          background-color: #f1f1f1;
        }
        /* Tùy chỉnh thanh trượt ngang */
        .table-responsive::-webkit-scrollbar {
          height: 12px; /* Tăng chiều rộng thanh trượt ngang */
        }
        .table-responsive::-webkit-scrollbar-track {
          background: #f1f1f1; /* Màu nền của thanh trượt */
          border-radius: 10px;
        }
        .table-responsive::-webkit-scrollbar-thumb {
          background: #888; /* Màu của thanh trượt */
          border-radius: 10px;
        }
        .table-responsive::-webkit-scrollbar-thumb:hover {
          background: #555; /* Màu khi hover */
        }
      `}</style>
    </Fragment>
  );
};

export default PhieuKyThuat;
