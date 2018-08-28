#!/usr/bin/env python3
"""
Small Python script to reload qutebrowser themes.

"""
try:
    from qutebrowser import qutebrowser, app
    from qutebrowser.misc import ipc
except ImportError:
    print("error: qutebrowser missing.")
    exit(1)


def qute_reload():
    """Send config-source command to qutebrowsers ipc server."""
    args = qutebrowser.get_argparser().parse_args()
    app.standarddir.init(args)
    socket = ipc._get_socketname(args.basedir)
    ipc.send_to_running_instance(socket, [":config-source"], args.target)

qute_reload()
