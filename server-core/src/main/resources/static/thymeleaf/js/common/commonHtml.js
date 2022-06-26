function fileAttachAppendData(seq) {
    "use strict";

    var attachDiv =document.createElement('div');
    if(seq != null){
        attachDiv.setAttribute("data-seq",seq);
    }
    attachDiv.innerHTML = '<span class="alt_input"> <input type="text" readonly="readonly" placeholder="선택된 파일이 없습니다."> <button type="button" class="custom-del-button"> <span class="hidden">delete file list</span> </button> </span>';
    return attachDiv;
}
function reportNav0TrafficCondition(count) {
    "use strict";

    var calendarId = "bbs_search_day_s"+count;
    var selectId = "select"+count;
    var tag =document.createElement('div');
    tag.classList.add('box_wrap');
    tag.innerHTML =
        '                   <div class="box">\n' +
        '                        <div class="box_wrap">\n' +
        '                            <table class="bbs_table write">\n' +
        '                                <caption>주요 교통상황 대응현황 - 일시, 관리기관, 위치(노선), 사고내용, 사고대응, 피해현황(인명), 피해현황(시설물) 입력</caption>\n' +
        '                                <colgroup>\n' +
        '                                    <col style="width:15%;" />\n' +
        '                                    <col style="width:85%;" />\n' +
        '                                </colgroup>\n' +
        '                                <tbody>\n' +
        '                                <tr>\n' +
        "                                   <th scope='row'><label for="+calendarId+" >일시</label></th>"+
        '                                    <td>\n' +
        '                                    <span class="calendar_box">\n' +
        "                                      <input type='text' id="+calendarId+" title='날짜 선택' readonly />"+
        '                                    </span>\n' +
        '                                        <select id="time03" title="시간 선택" style="width:100px;">\n' +
        '                                            <option> 00시</option>\n' +
        '                                            <option> 01시</option>\n' +
        '                                            <option> 02시</option>\n' +
        '                                            <option> 03시</option>\n' +
        '                                            <option> 04시</option>\n' +
        '                                            <option> 05시</option>\n' +
        '                                            <option> 06시</option>\n' +
        '                                            <option> 07시</option>\n' +
        '                                            <option> 08시</option>\n' +
        '                                            <option> 09시</option>\n' +
        '                                            <option> 10시</option>\n' +
        '                                            <option> 11시</option>\n' +
        '                                            <option> 12시</option>\n' +
        '                                            <option> 13시</option>\n' +
        '                                            <option> 14시</option>\n' +
        '                                            <option> 15시</option>\n' +
        '                                            <option> 16시</option>\n' +
        '                                            <option> 17시</option>\n' +
        '                                            <option> 18시</option>\n' +
        '                                            <option> 19시</option>\n' +
        '                                            <option> 20시</option>\n' +
        '                                            <option> 21시</option>\n' +
        '                                            <option> 22시</option>\n' +
        '                                            <option> 23시</option>\n' +
        '                                        </select>\n' +
        '                                    </td>\n' +
        '                                </tr>\n' +
        '                                <tr>\n' +
        "                                    <th scope='row'><label for="+selectId+">관리기관</label></th>\n" +
        '                                    <td>\n' +
        "                                        <select name='' id="+selectId+" title='관리기관 선택'>\n" +
        '                                            <option value="10012000">서울지방국토관리청</option>\n' +
        '                                            <option value="22093700">원주지방국토관리청</option>\n' +
        '                                            <option value="30072301">대전지방국토관리청 </option>\n' +
        '                                            <option value="57075101">익산지방국토관리청</option>\n' +
        '                                            <option value="60173001">부산지방국토관리청</option>\n' +
        '                                        </select>\n' +
        '                                    </td>\n' +
        '                                </tr>\n' +
        '                                <tr>\n' +
        '                                    <th scope="row"><label for="location">위치(노선)</label></th>\n' +
        '                                    <td>\n' +
        '                                        <input type="text" id="location" />\n' +
        '                                    </td>\n' +
        '                                </tr>\n' +
        '                                <tr>\n' +
        '                                    <th scope="row"><label for="input_content">사고내용</label></th>\n' +
        '                                    <td>\n' +
        '                                        <input type="text" id="input_content" />\n' +
        '                                    </td>\n' +
        '                                </tr>\n' +
        '                                <tr>\n' +
        '                                    <th scope="row"><label for="response">사고대응</label></th>\n' +
        '                                    <td>\n' +
        '                                        <input type="text" id="response" />\n' +
        '                                    </td>\n' +
        '                                </tr>\n' +
        '                                <tr>\n' +
        '                                    <th scope="row"><label for="states01">피해현황(인명)</label></th>\n' +
        '                                    <td>\n' +
        '                                        <input type="text" id="states01" />\n' +
        '                                    </td>\n' +
        '                                </tr>\n' +
        '                                <tr>\n' +
        '                                    <th scope="row"><label for="states02">피해현황(시설물)</label></th>\n' +
        '                                    <td>\n' +
        '                                        <input type="text" id="states02" />\n' +
        '                                    </td>\n' +
        '                                </tr>\n' +
        '                                </tbody>\n' +
        '                            </table>\n' +
        '                            <!-- //bbs_table write -->\n' +
        '\n' +
        '                            <div class="bbs_btn_wrap clearfix">\n' +
        '                                <div class="bbs_left">\n' +
        '\n' +
        '                                </div>\n' +
        '                                <div class="bbs_right">\n' +
        '                                    <button type="button" class="bbs_btn marker-traffic-button delete">삭제</button>\n' +
        '                                    <button type="button" value="0" class="bbs_btn marker-traffic-button write">저장</button>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <!-- //bbs_btn_wrap -->\n' +
        '                        </div>\n' +
        '                    </div>'


    return tag;
}

