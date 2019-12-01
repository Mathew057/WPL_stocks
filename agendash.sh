# @Author: Mathew Black <Mathew>
# @Date:   2019-12-01T17:35:30-06:00
# @Email:  dev@mathewblack.com
# @Filename: agendash.sh
# @Last modified by:   Mathew
# @Last modified time: 2019-12-01T17:35:56-06:00
# @License: MIT
#!/bin/bash
npx agendash --db=mongodb://localhost/agenda --collection=agendaJobs --port=3001
