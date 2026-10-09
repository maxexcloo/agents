function pi
    safe pi $argv
end

function pi-docker
    safe-docker pi $argv
end

function pi-infra
    safe-infra pi $argv
end

function pi-unsafe
    command pi $argv
end

complete -c pi-docker -w pi
complete -c pi-infra -w pi
complete -c pi-unsafe -w pi
