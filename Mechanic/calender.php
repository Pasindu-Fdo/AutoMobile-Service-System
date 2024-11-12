    <?php
        session_start();
        include 'includes/header.php';
        include 'includes/subheader.php';
        include 'includes/sidebar.php';
        include '../functions/alert.php';
    ?>
    <link rel="stylesheet" href="/AutoMobile Project/Mechanic/assets/css/calender.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer"/>

    <div class="col-md-9 flex-grow-1 p-3">
        <div class="text-center">
            <div class="container">
                <h2>Calender</h2>
                <div class="calender-container">
                    <div class="left">
                        <div class="calendar">
                            <div class="month">
                                <i class="fas fa-angle-left prev"></i>
                                <div class="date">october 2024</div>
                                <i class="fas fa-angle-right next"></i>
                            </div>
                            <div class="weekdays">
                                <div>Sun</div>
                                <div>Mon</div>
                                <div>Tue</div>
                                <div>Wed</div>
                                <div>Thu</div>
                                <div>Fri</div>
                                <div>Sat</div>
                            </div>
                            <div class="days"></div>
                            <div class="goto-today">
                                <div class="goto">
                                    <input type="text" placeholder="mm/yyyy" class="date-input" />
                                    <button class="goto-btn">Go</button>
                                </div>
                                <button class="today-btn">Today</button>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="today-date">
                            <div class="event-day">wed</div>
                            <div class="event-date">6th october 2024</div>
                        </div>
                        <div class="events"></div>
                        <div class="add-event-wrapper">
                            <div class="add-event-header">
                                <div class="title">Add Event</div>
                                <i class="fas fa-times close"></i>
                            </div>
                            <div class="add-event-body">
                                <div class="add-event-input">
                                    <input type="text" placeholder="Event Name" class="event-name" />
                                </div>
                                <div class="add-event-input">
                                    <input
                                        type="text"
                                        placeholder="Event Time From"
                                        class="event-time-from" />
                                </div>
                                <div class="add-event-input">
                                    <input
                                        type="text"
                                        placeholder="Event Time To"
                                        class="event-time-to" />
                                </div>
                            </div>
                            <div class="add-event-footer">
                                <button class="add-event-btn">Add Event</button>
                            </div>
                        </div>
                    </div>
                    <button class="add-event">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>


        </div>
    </div>

    <!-- Closing the row , container divs opened in the sidebar -->
    </div>
</div>
    
    <script src="/AutoMobile Project/Mechanic/assets/js/index.js"></script>
    <script src="/AutoMobile Project/Mechanic/assets/js/calender.js"></script>
</body>

</html>