alias pi='safe pi'
alias pi-docker='safe-docker pi'
alias pi-infra='safe-infra pi'
alias pi-unsafe='command pi'

complete -c pi-docker -w pi
complete -c pi-infra -w pi
complete -c pi-unsafe -w pi
